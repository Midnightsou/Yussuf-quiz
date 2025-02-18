// Define questions for each level
const questions = {
  easy: [
    ["Who was Prophet Yusuf's father?", ["Prophet Ya'qub", "Prophet Ibrahim", "Prophet Musa"], 0],
    ["What did Prophet Yusuf see in his dream?", ["Eleven stars", "A full moon", "A burning tree"], 0],
    ["Who were Prophet Yusuf's brothers?", ["Twelve", "Ten", "Seven"], 0],
    ["Where was Prophet Yusuf thrown into?", ["A well", "A cave", "A dungeon"], 0],
    ["Who bought Prophet Yusuf in Egypt?", ["A merchant", "The king", "Al-Aziz"], 2]
  ],
  medium: [
    ["How many brothers did Prophet Yusuf have?", ["Ten", "Eleven", "Twelve"], 1],
    ["What did the king’s dream symbolize?", ["Years of plenty followed by years of famine", "The rise of a new empire", "A disaster on the horizon"], 0],
    ["What was Prophet Yusuf’s job in Egypt after his release?", ["He managed the food supply", "He was a general", "He worked in the palace"], 0]
  ],
  hard: [
    ["What was the king's dream in Prophet Yusuf's story?", ["Seven fat cows and seven thin cows", "A river overflowing", "A harvest of wheat"], 0],
    ["What was the interpretation of the king's dream?", ["Years of plenty followed by years of famine", "A new ruler will come", "Egypt will prosper"], 0],
    ["How many brothers did Prophet Yusuf have?", ["Twelve", "Eleven", "Seven"], 0]
  ]
};

let currentLevel = '';
let currentQuestionIndex = 0;
let correctAnswers = 0;
let timerInterval;
let timeRemaining = 30; // Seconds

// Select DOM elements
const startButton = document.getElementById('start-btn');
const easyButton = document.getElementById('easy-btn');
const mediumButton = document.getElementById('medium-btn');
const hardButton = document.getElementById('hard-btn');
const nextButton = document.getElementById('next-btn');
const questionText = document.getElementById('question-text');
const questionNum = document.getElementById('question-num');
const answersDiv = document.getElementById('answers');
const timerDisplay = document.getElementById('timer');
const quizScreen = document.getElementById('quiz-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const resultsScreen = document.getElementById('results-screen');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

// Event listeners for buttons
startButton.addEventListener('click', startQuiz);
easyButton.addEventListener('click', () => startQuizWithLevel('easy'));
mediumButton.addEventListener('click', () => startQuizWithLevel('medium'));
hardButton.addEventListener('click', () => startQuizWithLevel('hard'));
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    welcomeScreen.style.display = 'none';
    quizScreen.style.display = 'block';
}

function startQuizWithLevel(level) {
    currentLevel = level;
    currentQuestionIndex = 0;
    correctAnswers = 0;
    timeRemaining = 30;
    welcomeScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    resultsScreen.style.display = 'none';
    startTimer();
    loadQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = `Time Remaining: ${timeRemaining}s`;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            showResults();
        }
    }, 1000);
}

function loadQuestion() {
    if (currentQuestionIndex >= questions[currentLevel].length) {
        showResults();
        return;
    }

    const [question, options, correctIndex] = questions[currentLevel][currentQuestionIndex];
    questionText.textContent = question;
    questionNum.textContent = currentQuestionIndex + 1;
    answersDiv.innerHTML = '';

    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index, correctIndex));
        answersDiv.appendChild(button);
    });
}

function checkAnswer(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
        correctAnswers++;
    }
    currentQuestionIndex++;
    nextButton.style.display = 'inline-block';
}

function nextQuestion() {
    nextButton.style.display = 'none';
    loadQuestion();
}

function showResults() {
    quizScreen.style.display = 'none';
    resultsScreen.style.display = 'block';
    scoreDisplay.textContent = `${correctAnswers} / ${questions[currentLevel].length}`;
}

function restartQuiz() {
    resultsScreen.style.display = 'none';
    welcomeScreen.style.display = 'block';
          }
