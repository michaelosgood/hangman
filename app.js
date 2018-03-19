//GLOBAL VARIABLES
//--------------------------------------------------------------
//Arrays and Variables for holding data
var wordOptions = ["both","bucketlist","twothangs","pyrexpot","hustle","myplug","bootyshorts"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

//Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

//FUNCTIONS (reuable blocks of code I can call upon when needed)
//--------------------------------------------------------------
function startGame () {
	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	lettersinWord = selectedWord.split("");
	numBlanks = lettersinWord.length;

	//Reset
	guessesLeft = 9;
	wrongLetters = [];
	blanksAndSuccesses = [];

	//Populate blanks and successes with right number of blanks
	for (var i=0; i<numBlanks; i++){
		blanksAndSuccesses.push("_");
	}

	//Change HTML to reflect round conditions
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;

	//Testing / Debugging
	console.log(selectedWord)
	console.log(lettersinWord)
	console.log(numBlanks)
	console.log(blanksAndSuccesses)
}

function checkLetters(letter) {
	// check if letter exists in code at all
	var isLetterInWord = false;
	for (var i=0; i<numBlanks; i++) {
		if(selectedWord[i] === letter) {
			isLetterInWord = true;
		}
	}

	//Check where in the word Letter exists, then populate in blanksAndSuccesses array
	if(isLetterInWord){
		for (var i=0; i<numBlanks; i++) {
			if(selectedWord[i] === letter) {
				blanksAndSuccesses[i] = letter;
			}		
		}
	}

	//Letter wasn't found
	else {
		wrongLetters.push(letter);
		guessesLeft--;
	}

	//Testing and Debugging
	console.log(blanksAndSuccesses);
}

function roundComplete(){
	console.log("Win count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left " + guessesLeft);

	//Update the HTML to reflect the most recent count stats
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ")


	//check if user won
	if(lettersinWord.toString() === blanksAndSuccesses.toString()){
		winCount++;
		alert("You Won");

		// update the win counter in the HTML
		document.getElementById("winCounter").innerHTML = winCount;

		startGame();
	}

	//check if user lost
	else if (guessesLeft === 0){
		lossCount++;
		alert("You Lost");

		//Update the HTML
		document.getElementById("lossCounter").innerHTML = lossCount;

		startGame();
	}
}

//MAIN PROCESS
//--------------------------------------------------------------

//Initiates the code for the first time
startGame();


//Register keyclicks
document.onkeyup = function(event) {
	var lettersGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(lettersGuessed);
	roundComplete();

	// Testing/Debugging
	console.log(lettersGuessed);
}
