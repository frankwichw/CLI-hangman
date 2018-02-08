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

// using recursion to ask for guesses 
var gameFunction = function() {
	// inquirer prompting user for guess
	inquirer.prompt(questions).then(answers => {
	  // console.log(JSON.stringify(answers.input_guess));
	  // decrement guesses left
	  guessesLeft--;

	  // call guessing function to compare inquirer answer to letter objects
	  wordObj.guessFunction(answers.input_guess);

	  // display the word and the guesses left to player
	  console.log("\n" + wordObj.letterArray[0]);
	  console.log("\n" + wordObj.displayArray);
	  console.log("\nGuesses left: " + guessesLeft + "\n");

	  if (guessesLeft > 0 && wordObj.displayArray != wordObj.letterArray[0]){
	  	gameFunction();
	  } else if (guessesLeft > 0 && wordObj.displayArray === wordObj.letterArray[0]){
	  	winning();
	  } else if (guessesLeft < 1){
	  	losing();
	  };
	});
};

// calling game function first
gameFunction();

// questions for inquirer after game is done
var afterGameQuestions = [
  {
    type: 'input',
    name: 'input_selection',
    message: "Do you want to play again? y/n (type y or n and hit enter)"
  }
];

// winning function to reset guesses/pick a new word
var winning = function(){
	console.log("\nCongratulations! You Won!\n");
	inquirer.prompt(afterGameQuestions).then(answers => {
		if(answers.input_selection === "y"){
			guessesLeft = 20;
			chosenWord = wordArray[Math.floor(Math.random() * (4 - 0) + 0)];
			console.log("\n" + wordObj.displayArray);
			console.log("\nGuesses left: " + guessesLeft + "\n");
			gameFunction();

		} else {
			console.log("Bye! :)");
		}
	});
};

// losing function
var losing = function(){
	console.log("\nSorry, you lost!\n");
	inquirer.prompt(afterGameQuestions).then(answers => {
		if(answers.input_selection === "y"){
			guessesLeft = 20;
			chosenWord = wordArray[Math.floor(Math.random() * (4 - 0) + 0)];
			console.log("\n" + wordObj.displayArray);
			console.log("\nGuesses left: " + guessesLeft + "\n");
			gameFunction();

		} else {
			console.log("Bye! :)");
		}
	});
};