// constructor to create the letter objects to be guessed, passed a letter
var Letter = function(a){
	this.letter = a;
	this.letterDisplayed = "_";
	this.guessed = false;
	// function that checks to see the status of this.guessed and displays character accordingly
	this.toString = function(){
		if (this.guessed === false){
			this.letterDisplayed = "_";
		} else if (this.guessed === true) {
			this.letterDisplayed = this.letter;
		}
	};
	// guessing function that checks guessed letter against object property letter
	this.guessing = function(b){
		if (this.letter === b){
			this.guessed = true;
			this.toString();
		} 
	};
};

module.exports = Letter;