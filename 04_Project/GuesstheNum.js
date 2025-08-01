// IDEA - Generate a random number and ask the user to guess it within 10 tries.

let randomNumber = parseInt(Math.random() * 100 + 1); // Generates a radom number between 1 to 100 and stores it in variable 'randomNumber'
console.log(randomNumber);

const submit = document.querySelector('#subt'); // Stores the DOM element for Submit Button
const userInput = document.querySelector('#guessField'); // Stores the DOM element for the value entered in the white text box field
const guessSlot = document.querySelector('.guesses'); // Stores the DOM element for the span element in front of 'Previous guess'
const remaining = document.querySelector('.lastResult'); // Stores the DOM element for for the span element in front of 'Guesses Remaining'
const lowOrHi = document.querySelector('.lowOrHi'); // Stores the DOM elemenet for <p> below the span element for 'Guesses Remaining'
const startOver = document.querySelector('.resultParas'); //

const p = document.createElement('p'); // Required  to inject a paragraph.

let prevGuess = []; // Used to store the guesses.
let numGuess = 0; // Used to iterate the guesses

let playGame = true; // This is something that all the games should have to ensure we are starting the game.

// In order to start the game we will first have to listen to the 'click' event on the submit button.
if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault(); // Used to ensure that we stop here and the page doesn't refresh upon listening to the click event.
    const guess = parseInt(userInput.value); // we could have used .value when storing the DOM element in userInput, but it could create a problem when starting a new game.
    console.log(guess); // This line is not needed.
    validateGuess(guess); // Once we have the input the next step is to validate if the input is within the range of 1 to 100
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid Number');
  } else if (guess < 1) {
    alert('Please enter a number greater than One');
  } else if (guess > 100) {
    alert('Please enter a number less than 100');
  } else {
    prevGuess.push(guess); // Adds the value in the Array we created in global scope.
    if (numGuess === 11) {
      // Checks if it is the last attempt.
      displayGuess(guess);
      displayMessage(`Game Over. Random number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`You guessed it right`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Random Number is greater than the guessed number`);
  } else if (guess > randomNumber) {
    displayMessage(`Random Number is less than the guessed number`);
  }
}

function displayGuess(guess) {
  userInput.value = ''; // the value stored is made empty, so that we can store the next value in this
  guessSlot.innerHTML += `${guess}| `; // Adds the guessed value captured, in text format in front of the previous guesses option
  numGuess++;
  remaining.innerHTML = `${12 - numGuess}`; // Display the number of remaining options
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`; // Adds the message based on the logic above at the bottom of the game.
}

function endGame() {
  userInput.value = ''; // Empties the value stored in userInput.value
  userInput.setAttribute('disabled', ''); // Prevents the user from interacting with the text input box.
  p.classList.add('button'); // Adds a CSS class = "button" to the element <p> | .ClassList = is a special class that give access to CSS Class for the element (<p> in this case)
  p.innerHTML = `<h2 id="newGame">Start a new Game </h2>`; // Adds a h2 line with id = "newGame", to help us listen when the user wants to start a new game
  startOver.appendChild(p); // NEED TO CHECK THIS!
  playGame = false; // Stops the functioning of the game
  newGame(); // Calls the newGame function
}

function newGame() {
  const newGameButton = document.querySelector('#newGame'); // Stores the DOM element for id newGame we created under endGame
  newGameButton.addEventListener('click', function (e) {
    // Listens on the click for th newGameButton, we could also have used h2 to listen.
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = []; // Empties the old values stored in previous game.
    numGuess = 0; // Resets the values stored in the previous game.
    guessSlot.innerHTML = ''; // Removes the guesses for the previous game.
    remaining.innerHTML = `${12 - numGuess}`; // Resets the number of guesses to 10.
    userInput.removeAttribute('disabled'); // Re-enables the userInput attribute we disabled using .classList line.
    startOver.removeChild(p); // Removes the extra message that shows at the bottom.

    playGame = true;
  });
}
