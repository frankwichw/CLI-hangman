// requiring word variable from word.js
var Word = require("./word.js");
// requiring inquirer
var inquirer = require("inquirer");

// creating array of possible words
var wordArray = ["phenomenal", "excellent", "sensational", "exquisite"];

// choosing word to be used from array at random
var chosenWord = wordArray[Math.floor(Math.random() * (4 - 0) + 0)];

// initializing guesses left variable
var guessesLeft = 20

// creating word object passing it the chosen word
var wordObj = new Word(chosenWord);

// console.log(wordObj.letterArray[0]);

// initializing chosen word array and letter objects
wordObj.newLetters(chosenWord);
wordObj.letterMaker();
// displaying word
console.log("\n" + wordObj.displayArray);
console.log("\nGuesses left: " + guessesLeft + "\n");

// creating inquirer questions
var questions = [
  {
    type: 'input',
    name: 'input_guess',
    message: "Type one letter and hit enter to guess that letter!"
  }
];

var gameRunning = true;

// using recursion to ask for guesses 
var gameFunction = function() {

	// if the guesses left is over zero, continue to ask this question again
	if (guessesLeft > 0) {

		// inquirer prompting user for guess
		inquirer.prompt(questions).then(answers => {
		  // console.log(JSON.stringify(answers.input_guess));
		  // decrement guesses left
		  guessesLeft--;

		  // call guessing function to compare inquirer answer to letter objects
		  wordObj.guessFunction(answers.input_guess);

		  // display the word and the guesses left to player
		  console.log("\n" + wordObj.displayArray);
		  console.log("\nGuesses left: " + guessesLeft + "\n");

		  if (wordObj.displayArray == wordObj.letterArray[0]){
		  	gameRunning = false;
		  	console.log("Congratulations! You won!");
		  } else if (gameRunning === true) {
			// call game function again to start the recursive loop
			gameFunction();
		  }
		});
	} else {
		console.log("Sorry, you lost!\n");
	};
};

gameFunction();