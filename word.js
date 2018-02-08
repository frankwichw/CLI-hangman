// requiring letters.js
var Letter = require("./letters.js");

// constructor to create word
var Word = function(chosenWord){
	// empty array to be filled with the individual letters of the word
	this.letterArray = [];
	// letter object array
	this.letterObjArray = [];
	// display array
	this.displayArray =[];
	// function to split the passed word into individual letters and put it in an array
	this.newLetters = function(chosenWord){
		// populating letter array with individual letters split from chosen word
		this.letterArray.push(chosenWord.split(""));
	};
	// function to create letter objects from each individual letter
	this.letterMaker = function(){
		// for loop loops through letter array items, creates letter object
		for(var i = 0; i < this.letterArray[0].length; i++){
			var letterObj = new Letter(this.letterArray[0][i]);
			this.letterObjArray.push(letterObj);
		};

		// creating array of underscores to display
		for(var i = 0; i < this.letterArray[0].length; i++){
			this.displayArray.push(this.letterObjArray[i].letterDisplayed);
		};
	};
	// function that loops through each letter object in order to check the guessed letter against it
	this.guessFunction = function(letter){
		// looping through array of letter objects to use guess function
		for(var i = 0; i < this.letterArray[0].length; i++){
			this.letterObjArray[i].guessing(letter);
		};

		// emptying array so that I can repopulate it
		this.displayArray = [];

		// looping through to create the new array to display
		for(var i = 0; i < this.letterArray[0].length; i++){
			this.displayArray.push(this.letterObjArray[i].letterDisplayed);
		};

	}
};

// exports the word constructor
module.exports = Word;