// DOM Elements
const startButton = document.getElementById('start-btn');
const levelScreen = document.getElementById('level-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const signupScreen = document.getElementById('signup-screen');
const signinScreen = document.getElementById('signin-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const timerDisplay = document.getElementById('timer');
const finalScoreDisplay = document.getElementById('final-score');
const questionText = document.getElementById('question-text');
const questionNumber = document.getElementById('question-number');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');
const restartButton = document.getElementById('restart-btn');
const mainMenuButton = document.getElementById('main-menu-btn');
const showPasswordCheckbox = document.getElementById('show-password');

// Variables for quiz and user state
let currentQuestionIndex = 0;
let currentLevel = '';
let timer;
let timeLeft = 60;
let score = 0;
let userData = {};

// Data for the questions (20 questions per level)
const questions = {
  easy: [
    { question: "Who was the father of Prophet Yusuf?", options: ["Prophet Ya'qub", "Prophet Ibrahim", "Prophet Musa", "Prophet Muhammad"], correct: "Prophet Ya'qub" },
    { question: "What was the first dream Prophet Yusuf saw?", options: ["Eleven stars and the sun and moon prostrating to him", "A full moon in the sky", "A white dove flying", "A lion roaring"], correct: "Eleven stars and the sun and moon prostrating to him" },
    { question: "How many brothers did Prophet Yusuf have?", options: ["11", "12", "10", "9"], correct: "11" },
    // Add 17 more questions for easy level
  ],
  medium: [
    { question: "Who was the king of Egypt during Prophet Yusuf's time?", options: ["Pharaoh", "King of Egypt", "Cyrus", "Nebuchadnezzar"], correct: "Pharaoh" },
    { question: "Who threw Prophet Yusuf into the well?", options: ["His brothers", "The Pharaoh's soldiers", "The caravan traders", "The people of Madyan"], correct: "His brothers" },
    { question: "How long did Prophet Yusuf stay in prison?", options: ["7 years", "12 years", "10 years", "5 years"], correct: "7 years" },
    // Add 17 more questions for medium level
  ],
  hard: [
    { question: "How did Prophet Yusuf interpret the dream of the king?", options: ["7 years of good harvest followed by 7 years of famine", "7 years of drought", "7 years of prosperity", "7 years of warfare"], correct: "7 years of good harvest followed by 7 years of famine" },
    { question: "What was the name of the woman who tried to seduce Prophet Yusuf?", options: ["Zulaykha", "Fatima", "Aisha", "Hawa"], correct: "Zulaykha" },
    { question: "Where was Prophet Yusuf thrown into the well?", options: ["In the desert", "In the river", "In the valley", "In the forest"], correct: "In the desert" },
    // Add 17 more questions for hard level
  ],
};

// To show the Welcome Screen and start quiz
startButton.addEventListener('click', () => {
  welcomeScreen.classList.add('hidden');
  levelScreen.classList.remove('hidden');
});

// Show sign-up page
function showSignup() {
  signinScreen.classList.add('hidden');
  signupScreen.classList.remove('hidden');
}

// Show sign-in page
function showSignin() {
  signupScreen.classList.add('hidden');
  signinScreen.classList.remove('hidden');
}

// Show the quiz start page based on level
function startQuiz(level) {
  currentLevel = level;
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  
  levelScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  loadQuestion();
  startTimer();
}

// Timer logic
function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    } else {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

// Load current question
function loadQuestion() {
  const question = questions[currentLevel][currentQuestionIndex];
  questionNumber.textContent = `Question ${currentQuestionIndex + 1}`;
  questionText.textContent = question.question;

  optionsContainer.innerHTML = '';
  question.options.forEach((option) => {
    const optionButton = document.createElement('button');
    optionButton.textContent = option;
    optionButton.addEventListener('click', () => checkAnswer(option));
    optionsContainer.appendChild(optionButton);
  });

  nextButton.classList.add('hidden');
  prevButton.classList.add('hidden');
}

// Check the selected answer
function checkAnswer(selectedOption) {
  const correctAnswer = questions[currentLevel][currentQuestionIndex].correct;
  if (selectedOption === correctAnswer) {
    score++;
  }
  nextButton.classList.remove('hidden');
}

// Move to next question
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions[currentLevel].length) {
    loadQuestion();
  } else {
    endQuiz();
  }
});

// Move to previous question
prevButton.addEventListener('click', () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
});

// End the quiz
function endQuiz() {
  quizScreen.classList.add('hidden');
  resultsScreen.classList.remove('hidden');
  finalScoreDisplay.textContent = `Your Score: ${score}/${questions[currentLevel].length}`;
}

// Restart the quiz
restartButton.addEventListener('click', () => {
  score = 0;
  currentQuestionIndex = 0;
  timeLeft = 60;
  startQuiz(currentLevel);
});

// Go back to main menu
mainMenuButton.addEventListener('click', () => {
  resultsScreen.classList.add('hidden');
  welcomeScreen.classList.remove('hidden');
});

// Sign-in functionality
document.getElementById('signin-btn').addEventListener('click', () => {
  const username = document.getElementById('signin-username').value;
  const password = document.getElementById('signin-password').value;

  if (username && password) {
    if (localStorage.getItem(username) === password) {
      alert("Sign in successful!");
      showSignin();
    } else {
      alert("Incorrect credentials!");
    }
  } else {
    alert("Please enter username and password.");
  }
});

// Sign-up functionality
document.getElementById('signup-btn').addEventListener('click', () => {
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;

  if (username && password.length >= 5) {
    localStorage.setItem(username, password);
    alert("Sign-up successful!");
    signupScreen.classList.add('hidden');
    levelScreen.classList.remove('hidden');
  } else {
    alert("Please enter a valid username and password (minimum 5 characters).");
  }
});

// Show/hide password feature
showPasswordCheckbox.addEventListener('change', () => {
  const passwordField = document.getElementById('signup-password');
  if (showPasswordCheckbox.checked) {
    passwordField.type = 'text';
  } else {
    passwordField.type = 'password';
  }
});
