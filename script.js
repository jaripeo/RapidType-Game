const userInput = document.getElementById('userInput');
const displayText = document.getElementById('displayText'); //this is the random word for now in the middle
const message = document.createElement('p'); //this is the text at the very bottom
const counter = document.getElementById('counter'); //this is the counter at the top right
const timer = document.getElementById('timer'); //this is the timer at the top left
const wpm = document.getElementById('wpm');
document.body.appendChild(message); // Append the message element to the body

// Create an array of words
const words = ['pen', 'banana', 'count', 'pack', 'table', 'wood', 'bye', 'hello', 'bow', 'house'];
let currentWords = [];
let consecutiveCorrect = 0;
let consecutive = 0;

let totalTime = 15
let timeLeft = totalTime;
let timerInterval;

let wpmCount;


// Event listener for Enter key press
userInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const inputWords = userInput.value.split(' ');

        inputWords.forEach((word, index) => {
            if (index < currentWords.length && word === currentWords[index]) {
                consecutiveCorrect++;
                consecutive++;
            } else {
                return;
            }
        });

        if (consecutive > 0) {
            currentWords = currentWords.slice(consecutive);
            const newRandomWords = randomWords(consecutive);
            currentWords = currentWords.concat(newRandomWords);
            message.textContent = '';
            userInput.value = '';
            updateCounter();
            displayWords(currentWords);
        } else {
            displayWords(currentWords);
        }
        consecutive = 0;
    }
});

// Event listener for input to start the timer
userInput.addEventListener('input', function () {
    if (!timerInterval) {
        startTimer();
    }
});

// Function to randomly select a word from the array
function randomWords(count) {
    let newWords = [];

    while (newWords.length < count) {
        const newWord = randomWord();
        if (!newWords.includes(newWord)) {
            newWords.push(newWord);
        }
    }
    return newWords;
}

// Function to randomly select a word from the array
function randomWord() {
    const length = words.length;
    const index = Math.floor(Math.random() * length);
    return words[index];
}

// Function to display the word on the screen
function displayRandomWords() {
    currentWords = randomWords(words.length);
    displayWords(currentWords);
}

// Function to display the word on the screen
function displayWords(words) {
    displayText.textContent = words.join(' ');
}

// Function to update the counter
function updateCounter() {
    counter.textContent = consecutiveCorrect;
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(function () { //setInterval is a built-in function that calls a function or evaluates an expression at specified intervals (in milliseconds)
        timeLeft--;
        timer.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            showResults();
        }
    }, 1000);
}

// Function to show end results
function showResults() {
    clearInterval(timerInterval); //clearInterval is a built-in function that stops the intervals set by setInterval
    timer.textContent = 'Time is Up!';
    userInput.disabled = true;

    counter.textContent = 'Score Counter';
    message.textContent = 'Words Typed Correctly: ' + consecutiveCorrect;

    wpmCount = (60 / (totalTime - timeLeft)) * consecutiveCorrect;
    wpm.textContent = 'WPM: ' + wpmCount;
}

// Display a random word when the page loads
window.onload = displayRandomWords();