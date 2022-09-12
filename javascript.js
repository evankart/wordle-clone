const wordBank = [
  "Amber",
  "Ashen",
  "Azure",
  "Beige",
  "Black",
  "Blond",
  "Blush",
  "Brown",
  "Coral",
  "Cream",
  "Dusky",
  "Ebony",
  "Flame",
  "Green",
  "Hazel",
  "Henna",
  "Ivory",
  "Khaki",
  "Lemon",
  "Lilac",
  "Livid",
  "Mauve",
  "Milky",
  "Mocha",
  "Mousy",
  "Ochre",
  "Olive",
  "Pansy",
  "Peach",
  "Pearl",
  "Rouge",
  "Ruddy",
  "Sable",
  "Sandy",
  "Sepia",
  "Smoky",
  "Snowy",
  "Sooty",
  "Steel",
  "Straw",
  "Taupe",
  "Tawny",
  "Topaz",
  "Umber",
  "Wheat",
  "White",
];

// --------- TO DO ------------

// TO DO: Async/Await or Promise to create delay when adding green to all squares in correct guess

// TO DO: only update keyboard colors when the word is guessed

// 1. DEFINE VARIABLES

let randomIndex = Math.floor(Math.random() * wordBank.length);

// let hiddenWord = wordBank[randomIndex].toLowerCase(); // pick random word
let hiddenWord = "alarm";
console.log(hiddenWord);

let guessedWord = ""; // Blank starting guess

let guessedLetters = [];

let guesses = 0; // Staerting at guess number 0

let currentRow = 1; // Starting in row #1
let rowID = "row" + currentRow;
console.log("Row ID: " + rowID);

const boxes = document.querySelectorAll(".box"); // boxes = all of the boxes on the board

const letterKeys = document.querySelectorAll(".letterKey"); // keys = all of the keyboard keys

const deleteKey = document.querySelector(".deleteKey"); // deleteKey

const enterKey = document.querySelector(".enterKey"); // enter key

// 2. ADD EVENT LISTENERS

// logs computer keyboard input
window.addEventListener(
  "keydown",
  function (e) {
    console.log(`${e.key}`);
    for (i = 0; i < letterKeys.length; i++) {
      if (`${e.key}` == letterKeys[i].innerHTML.toLowerCase()) {
        letterKeys[i].click();
      }
    }
    if (`${e.key}` == "Backspace") {
      deleteLetter();
    } else if (`${e.key}` == "Enter") {
      checkGuess();
    }
  },
  false
);

// When a letter is pressed (and current guess is <5 chars) find the next open box, add the letter to it, darken the key bg color, and add the letter to the current guess.
letterKeys.forEach((item) => {
  item.addEventListener("click", (event) => {
    if (guessedWord.length < 5) {
      // only allow adding letters if the word is less than 5 letters long
      targetBox = document.querySelector(".box:empty"); // sets the target to the next open box
      targetBox.innerHTML = item.innerHTML; // places selected letter in the target box
      guessedLetters.push(item.innerHTML);
      console.log(guessedLetters);
      guessedWord = guessedWord.concat(item.innerHTML.toLowerCase()); // adds letter to the end of current guess
      console.log(guessedWord);
    }
  });
});

// When enter key is pressed - run the checkGuess function
enterKey.addEventListener("click", checkGuess);

// When delete key is pressed - run the deleteLetter function
deleteKey.addEventListener("click", deleteLetter);

// 3. DEFINE FUNCTIONS

// FUNCTION: Check if the word is correct when clicking enter
function checkGuess() {
  if (guessedWord.length == 5) {
    // Checks that guess is 5 letters long

    for (const y of guessedLetters) {
      if (guessedLetters.indexOf(y) != hiddenWord.indexOf(y)) {
        console.log("guess index: " + guessedWord.indexOf(y));
        console.log("hidden index: " + hiddenWord.indexOf(y));
        console.log(y + " in the same place!");
        letterKeys.forEach((item) => {});
      }
      letterKeys.forEach((item) => {
        // if (guessedLetters.indexOf(y) == hiddenWord.indexOf(y)) {
        //   console.log("guess index: " + guessedWord.indexOf(y));
        //   console.log("hidden index: " + hiddenWord.indexOf(y));
        //   console.log(y + " in the same place!");
        // }

        if (item.innerHTML == y && !hiddenWord.includes(y.toLowerCase())) {
          item.classList.add("dark");
        }

        if (item.innerHTML == y && hiddenWord.includes(y.toLowerCase())) {
          item.classList.add("green");
        }
      });
    }

    if (guessedWord.toLowerCase() === hiddenWord.toLowerCase()) {
      // Check if the guessed word is correct
      alert("YESSS!!!");
      resetGame();
    } else {
      console.log("Try another guess");
      guesses++;
      addColors();
      guessedWord = "";
      currentRow++;
      console.log("Current Row: " + currentRow);
      rowID = "row" + currentRow;
      console.log("Row ID: " + rowID);
      guessedLetters = [];
    }
  } else {
    console.log("Please enter a five letter word."); // If guess is not 5 letters long, promts the user
  }

  if (guesses >= 6) {
    alert("Better luck next time!");
    resetGame();
  }
}

// TO DO: Split up board and guesses by rows

//FUNCTION: Change relevant squares to green or yellow
function addColors() {
  let j = 0;
  let yellow = 0;

  row = document.getElementById(rowID);
  console.log("Current Row: " + currentRow);

  let spaces = row.children;

  for (let k = 0; k < spaces.length; k++) {
    // console.log("Letter: " + spaces[k].innerHTML);
    // console.log("Guessed Word: " + guessedWord);

    let hiddenInstances =
      hiddenWord.split(spaces[k].innerHTML.toLowerCase()).length - 1;
    // console.log("Hidden Instances: " + hiddenInstances);

    let guessInstances =
      guessedWord.split(spaces[k].innerHTML.toLowerCase()).length - 1;
    // console.log("Guess Instances: " + guessInstances);

    if (spaces[k].innerHTML != "") {
      if (spaces[k].innerHTML.toLowerCase() == hiddenWord[j]) {
        spaces[k].classList.add("green");
      } else if (
        hiddenWord.includes(spaces[k].innerHTML.toLowerCase()) &&
        hiddenInstances >= guessInstances
      ) {
        console.log(
          spaces[k].innerHTML +
            " appears " +
            guessInstances +
            " times in your guess"
        );
        console.log(
          spaces[k].innerHTML +
            " appears " +
            hiddenInstances +
            " times in the hidden word"
        );

        spaces[k].classList.add("yellow");

        // if (yellow < hiddenInstances) {
        //   spaces[k].classList.add("yellow");
        //   yellow++;
        //   console.log(yellow);
        // }
      } else if (
        hiddenWord.includes(spaces[k].innerHTML.toLowerCase()) &&
        guessInstances - hiddenInstances > 0
      ) {
        spaces[k].classList.add("clear");
      }
    }
    j++;
    // resets j count to 0 once it reaches 5
    if (j == 5) {
      j = 0;
    }
  }
}

// FUNCTION: Clear the board and reset the game, then pick a new hidden word
function resetGame() {
  let boxes = document.querySelectorAll(".box");
  boxes.forEach((item) => {
    item.innerHTML = ""; // clears the previous guesses from the board
    item.classList.add("green");

    item.classList.remove("green", "yellow"); // removes background colors form boxes on the board
  });
  guessedWord = ""; // resets the current guess to ""
  randomIndex = Math.floor(Math.random() * wordBank.length);
  hiddenWord = wordBank[randomIndex].toLowerCase(); // changes the hidden word to a new word
  guesses = 0; // resets the number of guesses to zero for new round
  currentRow = 1; // Starting in row #1
  rowID = "row" + currentRow;
  letterKeys.forEach((item) => {
    item.classList.remove("dark", "green", "yellow"); // resets keyboard background color
  });
  guessedLetters = [];
}

// FUNCTION: delete the last letter from your guess
function deleteLetter() {
  letterIndex = guessedLetters.indexOf(targetBox.innerHTML);
  if (letterIndex > -1) {
    // only splice array when item is found
    guessedLetters.splice(letterIndex, 1); // 2nd parameter means remove one item only
  }
  console.log(guessedLetters);

  // removes the dark styling from the letter key dark
  for (n of document.querySelectorAll(".letterKey")) {
    if (n.innerHTML.toLowerCase() == targetBox.innerHTML.toLowerCase()) {
      n.classList.remove("dark");
    }
  }

  targetBox.innerHTML = ""; // delete the last letter added
  targetBox = targetBox.previousElementSibling; // changes the target box to previous letter added
  guessedWord = guessedWord.slice(0, -1); // keeps all but the last letter of your guess

  // console.log(guessedWord);
}
