var inquirer = require("inquirer");
var fs = require("fs");

var cards = []; //this array is where the current cards list will be stored 

function BasicFlashcard(front, back){
    this.front = front;
    this.back = back;
    this.type = "basic";
    this.useCard = function(){
        //show front
        console.log(this.front);
        //ask if ready for answer
        inquirer.prompt([
            {
                type: "confirm";
                message: "Press enter to see answer",
                name: "confirm",
                default: true
            }
        ]).then(function(response){
            //show answer
            console.log(this.back);
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
        var clozeDeleted = this.returnCloseDeleted();
        console.log(closeDeleted);
        //ask if ready for answer
        inquirer.prompt([
            {
                type: "confirm";
                message: "Press enter to see answer",
                name: "confirm",
                default: true
            }
        ]).then(function(response){
            //show answer
            console.log(this.text);
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
            choices: ["Create New Card", "Review Cards", "Load Cards", "Archive Cards"],
            name: "action"
        }
    ]).then(function(response){
       if (response.action === "Create New Card"){
           createCard(); //run the create New Card function
       } else if (response.action === "Review Cards"){
           reviewCards(); //run the review cards function
       } else if (response.action === "Load Cards"){
           loadCards();
       } else if (response.action === "Archive Current Cards"){
           archiveCards();
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
        if (response.action === "Basic card"){
           createBasic(); //run the create New Card function
       } else {
           createClose(); //run the review cards function
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
    });
}

function createCloze(){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the full card, with the close in parentheses.  Such as: '<George Washington> was the first president of the United States.'",
            name: "full"
        }
    ]).then(function(response){
        //create the new card
        var fullCard = response.full;
        var clozeCardStart = "";
        var clozeCardMiddle = "";
        var clozeCardEnd = "";
        var status = "start";
        for (var i = 0; i < fullCard.length; i++){
            if (status === "start"){
                if (fullCard[i] != "<"){
                    clozeCardStart = clozeCardStart + fullCard[i];
                } else {
                    status = "middle";
                };
            } else if (status === "middle"){
                if (fullCard[i] != ">"){
                    clozeCardMiddle = clozeCardMiddle + fullCard[i];
                } else {
                    status = "end"
                };
            } else if (status === "end"){
                clozeCardEnd = clozeCardEnd + fullCard[i];
            };
        }
        var fullText = clozeCardStart + closeCardMiddle + closeCardEnd;
        var newCloze = new ClozeFlashard(fullText, clozeCardMiddle);
        //add the card to the array
        cards.push(newCloze);
    });
}

//funtion to review all the cards in current card Object
function reviewCards(){
    //get all the cards from the cards array (if no cards, say so)

    //review all the cards (recurrsion)


} //reviewCards()

//function to load all cards from cardLog.txt
function loadCards(){

}

//funciton to archive (save) all the cards to cardLog.txt 
function archiveCards(){

}