//Variables for the game :

//
var library = ["tesla","password","mgs"];
var namer = ["Morpheus" , "Cypher" , "Oracle" , "Neo" , "Trinity"]
var clueUser = ["Elon Musk" , "Mark Zuckerburg", "Hideo Kojima"]
var lettersInPicked = [];
var pickedWord = [];
var numberOfAster = 0;
var asterCorrectPicks = [];
var wrongPicks = [];
var wins = 0;
var loss = 0;
var picksLeft = 10;


//FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:

//create a gamestart trigger function
function startGame() {

    //ingame variable stats starts at this
    picksLeft = 10;
    wrongPicks = [];

    randomNumber = Math.floor(Math.random() * library.length);
    //select a random word from [library]
    pickedWord = library[randomNumber];

    //give a clue 
    clue = clueUser[randomNumber];

    //empty the array of the blanks and correct picks, 
    asterCorrectPicks = [];

    //take that random word , then put it in an empty array,split into # of letters ,will use later , 
    lettersInPicked = pickedWord.split("");

    //give number of characters as blanks by using .length
    numberOfAster = lettersInPicked.length;

    //Populate number of blanks with * based on how many letters in pickedWord
    for (var i = 0; i < numberOfAster; i++) 
    
    //For every iteration when counter "i" is less than number of blanks of the picked word, create an asterisk
    {
        asterCorrectPicks.push("*");
    }


    //after populating the pickedWord with number of asterisk  , set the game scores by modify the html file to reflect "game start"
    document.getElementById("passWord").innerHTML = asterCorrectPicks.join("");
    document.getElementById("attemptsLeft").innerHTML = picksLeft;
    document.getElementById("winCounter").innerHTML = wins;
    document.getElementById("lossCounter").innerHTML = loss;
    document.getElementById("cluePerson").innerHTML = clue;
    document.getElementById("cluePerson1").innerHTML = clue;

    
//END OF GAMESTART FUNCTION END OF GAMESTART FUNCTION END OF GAMESTART FUNCTION END OF GAMESTART FUNCTION END OF GAMESTART FUNCTION END OF GAMESTART FUNCTION END OF GAMESTART FUNCTIONEND OF GAMESTART FUNCTION
}

// create a function to check when the user gives out an event "onkeyup" , a function checks if that (event) letter is matches a letter that is on the pickedWord
function checker(letter) {

//create a variable outside the for loop , set that variable to a bolean false by default.
    var isLetterInWord = false;

//using the numberOfAster variable , make a forloop to check the letters one by one on the pickedWord.
    for (var i = 0; i < numberOfAster; i++) {

//using if statement , if the one of the index of the pickedWord matches with the letter, set the bolean to True , to be used later.
        if (pickedWord[i] == letter) {
            isLetterInWord = true;
        }

//END OF FORLOOP END OF FORLOOP //END OF FORLOOP END OF FORLOOP //END OF FORLOOP END OF FORLOOP
    }

//when isLetterIN
    if (isLetterInWord) {
//same as above, using the number of blanks , run thru the pickedWord's index, 
        for (var z = 0; z < numberOfAster; z++) {

//if statement of if pickedWord's index matches the letter , put the letter to the index of the pickedWord, populate it with the letter
            if (pickedWord[z] == letter) {
                asterCorrectPicks[z] = letter;
            }
        }
    }
//else, decrement picks left then push the wrong pick to the wrongPicks array
    else {
 //decrement the picks left 
        picksLeft--;
        wrongPicks.push(letter);
    }
//END OF CHECKER FUNCTION END OF CHECKER FUNCTION END OF CHECKER FUNCTION END OF CHECKER FUNCTION END OF CHECKER FUNCTION END OF CHECKER FUNCTION END OF CHECKER FUNCTION END OF CHECKER FUNCTION END OF CHECKER
    
}


//create a function to determine if the user wins or loss already
function roundChecker() { 

//change the array lettersInPicked to a string , match that to blanksCorrectPick change that to string , if its equal, increment wins variable.   
    if (lettersInPicked.toString() == asterCorrectPicks.toString()) {
        wins++;
// Allert message that you win 
        alert("You Successfully Hacked " )
//Update the win counter in HTML
        document.getElementById("winCounter").innerHTML = wins;
//Rerun startgame function
        startGame();
    }

//If picks left is equal to zero, alert you lose
    else if (picksLeft == 0) {
        loss++;
        alert("You Lose.");

        document.getElementById("lossCounter").innerHTML = loss;
//Rerun startgame function
        startGame();
    }

//Reset the html back to gamestart variables
    document.getElementById("attemptsLeft").innerHTML = picksLeft;
    document.getElementById("passWord").innerHTML = asterCorrectPicks.join("");
    document.getElementById("passWord").innerHTML = asterCorrectPicks.join("");
    document.getElementById("wrongLetters").innerHTML = wrongPicks.join("");
}

// Call the function , start the game

var person = prompt("Please Enter Your Username");
randomPrefix = namer[Math.floor(Math.random() * namer.length)];
document.getElementById("userName").innerHTML = person + " aka " + randomPrefix;

startGame();

//Detect the key press . 
document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checker(letterGuessed);
    roundChecker();
}