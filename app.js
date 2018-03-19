//GLOBAL VARIABLES
//--------------------------------------------------------------
//Arrays and Variables for holding data
var wordOptions = [
    "hydrogen", "helium", "lithium", "beryllium", "boron", "carbon",
    "nitrogen", "oxygen", "fluorine", "neon", "sodium", "magnesium", 
    "aluminum", "silicon", "phosphorus", "sulfur", "chlorine", "argon",
    "potassium", "calcium", "scandium", "titanium", "vanadium", "chromium", 
    "manganese", "iron", "cobalt", "nickel", "copper", "zinc", "gallium",
    "germanium", "arsenic", "selenium", "bromine", "krypton", "rubidium", 
    "strontium", "yttrium", "zirconium", "niobium", "molybdenum", "technetium",
    "ruthenium", "rhodium", "palladium", "silver", "cadmium", "indium", "tin", 
    "antimony", "tellurium", "iodine", "xenon", "cesium", "barium", "lanthanum", 
    "cerium", "praseodymium", "neodymium", "promethium", "samarium", "europium",
    "gadolinium", "terbium", "dysprosium", "holmium", "rrbium", "thulium",
    "ytterbium", "lutetium", "hafnium", "tantalum", "tungsten", "rhenium",
    "osmium", "iridium", "platinum", "gold", "mercury", "thallium", "lead",
    "bismuth", "polonium", "astatine", "radon", "francium", "radium", "actinium",
    "thorium", "protactinium", "uranium", "neptunium", "plutonium", "americium",
    "curium", "berkelium", "californium", "einsteinium", "fermium", "mendelevium",
    "nobelium", "lawrencium", "rutherfordium", "dubnium", "seaborgium", "bohrium", 
    "hassium", "meitnerium", "darmstadtium", "roentgenium", "copernicium", "nihonium",
    "flerovium", "moscovium", "livermorium", "tennessine", "oganesson"
];
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
