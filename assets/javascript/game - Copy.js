//Variables for the game :
var wordOptions = ["password" , "word" , "pass"];
var pickedWord = [];
var lettersInPicked = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];
var winCount = 0;
var lossCount = 0;
var guessesLeft = 10;
//start of the game
function startGame() {
    //ingame variable stats starts at this
    guessesLeft = 10;
    wrongLetters = [];
    //select a random word from [wordOptions]
    pickedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    //take that picked word , then put it in an empty array,split into # of letters ,will use later 
    lettersInWord = pickedWord.split("");
    //give number of characters as blanks by using .length
    numBlanks = lettersInWord.length;
    //push number of blanks to the array of  blanks
    blanksAndSuccesses = [];
    //Populate number of blanks with * based on how many letters in pickedWord
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("*");
    }
    //reset the game , modifying html file 
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;
}

function checkLetters(letter) {
    var isLetterInWord = false;
    for (var i = 0; i < numBlanks; i++) {
        if (pickedWord[i] == letter) {
            isLetterInWord = true;
        }
    }
    //Where in the word the letter exists and populate out blanksAndSuccesses array

    if (isLetterInWord) {
        for (var i = 0; i < numBlanks; i++) {
            if (pickedWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
            }
        }
    }

    //Letter wasn't found
    else {
        wrongLetters.push(letter);
        guessesLeft--
    }

    //Testing & Debugging

    console.log(blanksAndSuccesses);

}

function roundComplete() {
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left" + guessesLeft);


    //Update HTML to reflect most recent information
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(' ');
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
    
    
    //Check if user won
    if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
        winCount++;
        alert("You Won!!");

        //Update the win counter in HTML
        document.getElementById("winCounter").innerHTML = winCount;
        startGame();
    }

    //Check if user lost
    else if (guessesLeft == 0) {
        lossCount++;
        alert("You Lose.");

        //Update the HTML
        document.getElementById("lossCounter").innerHTML = lossCount;

        startGame();
    }

}

startGame();


document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();

    //Testing / Debuggin
    console.log(letterGuessed);
}