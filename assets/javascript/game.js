//Variables for the game :

//
var library = ["neo", "windows", "tesla", "password", "metalgear", "apple", "victorious", "hollywood", "golf", "legend", "bonus", "king", "breakup"];
var namer = ["Morpheus", "Cypher", "Oracle", "Neo", "Trinity", "Hackerman", "The Boss", "The Techlead", "Techies", "Icedfrog", "Iron Man"]
var clueUser = ["Keanu Reeves", "Bill  Gates", "Elon  Musk", "Mark Zuckerburg", "Hideo Kojima", "Tim D Cook", "Ariana Grande", "Kim Kardashian", "Tiger Woods", "Will Smith", "John R Chavez", "Elvis Presley", "Taylor Swift"]
var asterisk = [];
var lettersInPicked = [];
var pickedWord = [];
var numberOfAster = 0;
var asterCorrectPicks = [];
var wrongPicks = [];
var wins = 0;
var loss = 0;
var picksLeft = 10;
var picked = [];


//FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:FUNCTIONS HERE:

//create a gamestart trigger function
function startGame() {

    //ingame variable stats starts at this
    picksLeft = 10;
    wrongPicks = [];
    asterisk = [];

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
    document.getElementById("passWord1").innerHTML = asterisk.join("");
    document.getElementById("attemptsLeft").innerHTML = picksLeft;
    document.getElementById("winCounter").innerHTML = wins;
    document.getElementById("lossCounter").innerHTML = loss;
    document.getElementById("cluePerson").innerHTML = clue;
    document.getElementById("cluePerson1").innerHTML = clue;


    // this function enables the the non repeating of the words, if you successfully guessed the 13 words, it will trigger a restart page 
    function unRepeat() {
        console.log(picked.length);
        console.log(library.length);
        for (i = 0; i < library.length; i++) {
            //       console.log("unRepeater is Functioning");
            //       console.log(pickedWord + " unrepeater pickedWord");
            //      console.log(picked[i] +  " unrepeater ARRAY picked");
            if (picked[i] == pickedWord) {
                console.log(picked[i] + " Picked zero unRepeater Triggerd");
                console.log(pickedWord + " unRepeater Triggerd");
                if (picked.length == library.length) {
                    console.log(library.length + " RELOAD PROC");
                    console.log(picked.length + " RELOAD PROC");
                    alert("YOU HACKED EVERYONE! YOU WIN THE INTERNET!");
                    location.reload();
                }
                else {
                    startGame();
                    console.log(" ELSE PROCCING")
                }
            }
        }
    }
    /// END OF UNREPEAT FUNCTION

    unRepeat();
    //END OF GAMESTART FUNCTION END OF GAMESTART FUNCTION END OF GAMESTART FUNCTION END OF GAMESTART FUNCTION END OF GAMESTART FUNCTION END OF GAMESTART FUNCTION END OF GAMESTART FUNCTIONEND OF GAMESTART FUNCTION
}


/////////


function bonusChecker() {

    var bonusWord = asterCorrectPicks.join("")
    // console.log(asterCorrectPicks.join(""))
    // if the random word is the "bonus word " , the user wins 10 points
    if ("bonus" === bonusWord || "neo" === bonusWord) {
        wins += 10;
        //alert BONUS TRIGGERD
        alert("BONUS TRIGGERED!");
        picked.push(pickedWord);
        // console.log (picked);
        //Update the win counter in HTML
        document.getElementById("winCounter").innerHTML = wins;
        //Rerun startgame function
        startGame();
    }

    //if the bonus checker did not proc , run the round checker function
    else {
        roundChecker();
    }
}

///////

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
        // console.log("test1" + lettersInPicked.toString())
        // console.log("test2" + asterCorrectPicks.toString())
        wins++;
        picked.push(pickedWord);
        // console.log(picked);
        // Allert message that you win 
        alert("You Successfully Hacked " + clue)
        //Update the win counter in HTML
        document.getElementById("winCounter").innerHTML = wins;
        //Rerun startgame function
        startGame();
    }

    //If picks left is equal to zero, alert you lose
    else if (picksLeft == 0) {

        // added game mechanic , when user mis picks a word , it deducts a point from their wins , if the wins is > 0
        if (wins > 0) {
            wins--;
            loss++
        }

        else {
            loss++
        }

        alert("You Failed to hack " + clue);

        document.getElementById("lossCounter").innerHTML = loss;
        //Rerun startgame function
        startGame();
    }

    //Reset the html back to gamestart variables
    document.getElementById("attemptsLeft").innerHTML = picksLeft;
    document.getElementById("passWord").innerHTML = asterCorrectPicks.join("");
    document.getElementById("passWord1").innerHTML = asterisk.join("");
    document.getElementById("wrongLetters").innerHTML = wrongPicks.join("");
}

// Call the function , start the game

var person = prompt("Please Enter Your Username");
randomPrefix = namer[Math.floor(Math.random() * namer.length)];
document.getElementById("userName").innerHTML = person + " codename : " + randomPrefix;


startGame();

//Detect the key press . add asterisk to emulate putting in a passworkd
document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checker(letterGuessed);
    bonusChecker();
    asterisk.push("*");
}