

var BasicFlashcard = function(front, back){
    this.front = front;
    this.back = back;
    this.type = "basic";
    this.useCard = function(){
        //ask for input

        //display content

        //as for a guess (use "input") or "answer" to get answer

        //display either "correct + answer" or just "answer"
    };
    this.saveCard = function(){
        //save card to text file
    };
};

var ClozeFlashard = function(full, cloze){
    this.full = full;
    this.cloze = cloze;
    this.type = "cloze";
    this.useCard = function(){
        //ask for input

        //display content

        //as for a guess (use "input") or "answer" to get answer

        //display either "correct + answer" or just "answer"
    };
    this.saveCard = function(){
        //save card to text file
    };
}