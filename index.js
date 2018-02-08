// requiring word variable from word.js
var Word = require("./word.js");
// requiring inquirer
var inquirer = require("inquirer");

// creating array of possible words
var wordArray = ["phenomenal", "excellent", "sensational", "exquisite"];

var chosenWord;

// initializing guesses left variable
var guessesLeft;

var wordObj;

var questions = [
  {
    type: 'input',
    name: 'game_start',
    message: "Do you want to play hangman? y/n (type y or n and hit enter)"
  }
];

inquirer.prompt(questions).then(answers => {
	if(answers.game_start === "y"){
		initializeGame();
	} else {
		console.log("\nBye! :)\n");
	}
});

var initializeGame = function(){
	// choosing word to be used from array at random
	chosenWord = wordArray[Math.floor(Math.random() * (4 - 0) + 0)];
	
	guessesLeft = 20;

	// creating word object passing it the chosen word
	wordObj = new Word(chosenWord);

	// initializing chosen word array and letter objects
	wordObj.newLetters(chosenWord);
	wordObj.letterMaker();

	// displaying word
	console.log("\n" + wordObj.displayArray);
	console.log("\nGuesses left: " + guessesLeft + "\n");

	gameFunction();
}

// creating inquirer questions
var gameQuestions = [
  {
    type: 'input',
    name: 'input_guess',
    message: "Type one letter and hit enter to guess that letter!"
  }
];

// using recursion to ask for guesses 
var gameFunction = function() {
	// inquirer prompting user for guess
	inquirer.prompt(gameQuestions).then(answers => {
	  // console.log(JSON.stringify(answers.input_guess));
	  // decrement guesses left
	  guessesLeft--;

	  // call guessing function to compare inquirer answer to letter objects
	  wordObj.guessFunction(answers.input_guess);

	  // display the word and the guesses left to player
	  console.log("\n" + wordObj.displayArray);
	  console.log("\nGuesses left: " + guessesLeft + "\n");

	  if (guessesLeft > 0 && wordObj.displayArray.toString() != wordObj.letterArray[0].toString()){
	  	gameFunction();
	  } else if (guessesLeft > 0 && wordObj.displayArray.toString() === wordObj.letterArray[0].toString()){
	  	winning();
	  } else if (guessesLeft < 1){
	  	losing();
	  };
	});
};

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
	console.log("----------\nCongratulations! You Won!\n");
	inquirer.prompt(afterGameQuestions).then(answers => {
		if(answers.input_selection === "y"){
			initializeGame();
		} else {
			console.log("\nBye! :)\n");
		}
	});
};

// losing function
var losing = function(){
	console.log("----------\n\nSorry, you lost!\n");
	inquirer.prompt(afterGameQuestions).then(answers => {
		if(answers.input_selection === "y"){
			initializeGame();
		} else {
			console.log("\nBye! :)\n");
		}
	});
};