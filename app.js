var inquirer = require("inquirer");
var fs = require("fs");

var cards = []; //this array is where the current cards list will be stored 

function BasicFlashcard(front, back){
    this.front = front;
    this.back = back;
    this.type = "basic";
    this.useCard = function(){
        back = this.back;
        //show front
        console.log("");
        console.log("Front: " + this.front);
        //ask if ready for answer
        inquirer.prompt([
            {
                type: "input",
                message: "What is on the back?",
                name: "input",
            }
        ]).then(function(response){
            //show the result
            if (response.input === back) {
                console.log("You are correct!");
            } else {
                console.log("Nope.  The back was: " + back);
            }
            //re-start the app's loop
            startApp();
        })
    };
};

function ClozeFlashard(text, cloze){
    this.text = text;
    this.cloze = cloze;
    this.type = "cloze";
    this.returnClozeDeleted = function(){  //return cloze-deleted version of text 
        var textArray = this.text.split(this.cloze);
        var clozeDeleted = textArray.join(". . .");
        return clozeDeleted;
    };
    this.useCard = function(){
        //show cloze deleted text 
        var clozeDeleted = this.returnClozeDeleted();
        var answer = this.text;
        var cloze = this.cloze;
        console.log("");
        console.log("cloze-deleted version: " + clozeDeleted);
        //ask if ready for answer
        inquirer.prompt([
            {
                type: "input",
                message: "What is missing in the ' . . . ' ?",
                name: "input",
            }
        ]).then(function(response){
            //show the result
            if (response.input === answer){
                console.log("You are correct!");
            } else {
                console.log("Nope. The answer was: " + cloze);
            };
            console.log("The whole phraze was: " + answer);
            //re-start the app's loop
            startApp();
        })
    };
}

//CLI funcitons
//funtion to direct user to create new card or review cards 
function startApp(){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Create New Card", "Review A Card", "Load Cards", "Save Cards"],
            name: "action"
        }
    ]).then(function(response){
       if (response.action === "Create New Card"){
           createCard(); //run the create New Card function
       } else if (response.action === "Review A Card"){
           console.log("lets review a card"); //testing
           reviewCards(cards); //run the review cards function
       } else if (response.action === "Load Cards"){
           loadCards();
       } else if (response.action === "Save Cards"){
           saveCards(cards);
       }
    });
} //startApp()

//function to create new card from input 
function createCard(){
    inquirer.prompt([
        {
            type: "list",
            message: "What type of card will you create?",
            choices: ["Basic card", "Cloze card"],
            name: "cardType"
        }
    ]).then(function(response){
        if (response.cardType === "Basic card"){
           createBasic(); //run the create New Card function
       } else {
           createCloze(); //run the review cards function
       };
    });
} //createCard()

function createBasic(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the front?",
            name: "front"
        },
        {
            type: "input",
            message: "What is the back?",
            name: "back"
        }
    ]).then(function(response){
        //create the new card
        var newBasic = new BasicFlashcard(response.front, response.back);
        //store the card in the cards array
        cards.push(newBasic);
        //re-start the app's loop
        startApp();
    });
}

function createCloze(){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the full card.  Such as: 'George Washington was the first president of the United States.'",
            name: "text"
        },
        {
            type: "input",
            message: "Enter the text that should be clozed (e.g. 'George Washington')",
            name: "cloze"
        }
    ]).then(function(response){
        console.log("hello"); // tester
        var fullCard = response.text;
        var cloze = response.cloze;
        console.log(fullCard, cloze);
        //check to make sure the cloze works
        if (fullCard.indexOf(cloze) != -1){
            //store the card
            var newCloze = new ClozeFlashard(fullCard, cloze);
            //add the card to the array
            cards.push(newCloze);
        } else {
            console.log("That cloze is not inside the text of your card.  Start Again.")
        }
        //restart the app loop
        startApp();
    });
}

//funtion to review all the cards in current card Object
function reviewCards(cardsArray){
    //get all the cards from the cards array (if no cards, say so)
    console.log("test");
    var randomCard = Math.floor(Math.random() * cardsArray.length);
    cardsArray[randomCard].useCard();
} //reviewCards()

//function to load all cards from cardLog.txt
function loadCards(){
    //get al the cards from the text file and save to the cards array
    //clear cards array
    cards = [];
    // load cards

}

//funciton to archive (save) all the cards to cardLog.txt 
function saveCards(cardsArray){
    //save all the objects in the cards array to the text file
    //clear the file then write all the current cards
    fs.writeFile("cardLog.txt", "", function(error){
        if (error){
            console.log("An error occured while saving the cards");
            return;
        } else {
            for (var i = 0; i < cardsArray.length; i++){
                var saveString = "<<START>>" + JSON.stringify(cardsArray[i]) + "<<END>>";
                fs.appendFile("cardLog.txt", saveString, function(error){
                    if (error) console.log("An error occured while writing a card to the save file.");
                })
            };
            console.log("The cards were successfully saved");
        };
    });
}


//run the app
startApp();