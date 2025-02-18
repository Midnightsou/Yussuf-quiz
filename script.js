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
    {
      question: "Who was the father of Prophet Yusuf?",
      options: ["Prophet Ya'qub", "Prophet Ibrahim", "Prophet Musa", "Prophet Muhammad"],
      correct: "Prophet Ya'qub"
    },
    {
      question: "What was the first dream Prophet Yusuf saw?",
      options: ["Eleven stars and the sun and moon prostrating to him", "A full moon in the sky", "A white dove flying", "A lion roaring"],
      correct: "Eleven stars and the sun and moon prostrating to him"
    },
    // Add 18 more questions here for easy level
  ],
  medium: [
    {
      question: "Who was the king of Egypt during Prophet Yusuf's time?",
      options: ["Pharaoh", "King of Egypt", "Cyrus", "Nebuchadnezzar"],
      correct: "Pharaoh"
    },
    {
      question: "Who threw Prophet Yusuf into the well?",
      options: ["His brothers", "The Pharaoh's soldiers", "The caravan traders", "The people of Madyan"],
      correct: "His brothers"
    },
    // Add 18 more questions here for medium level
  ],
  hard: [
    {
      question: "How many years did Prophet Yusuf stay in prison?",
      options: ["7 years", "12 years", "10 years", "5 years"],
      correct: "7 years"
    },
    {
      question: "Who was the woman who tried to seduce Prophet Yusuf?",
      options: ["Zulaykha", "Fatimah", "Maryam", "Asiya"],
      correct: "Zulaykha"
    },
    // Add 18 more questions here for hard level
  ]
};

// Function to start the quiz
startButton.addEventListener('click', () => {
  welcomeScreen.classList.add('hidden');
  levelScreen.classList.remove('hidden');
});

// Function to show the quiz screen after selecting level
function startQuiz(level) {
  currentLevel = level;
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  levelScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  startTimer();
  displayQuestion();
}

// Function to display the question
function displayQuestion() {
  const question = questions[currentLevel][currentQuestionIndex];
  questionText.textContent = question.question;
  questionNumber.textContent = `Question ${currentQuestionIndex + 1}`;
  optionsContainer.innerHTML = '';
  question.options.forEach((option) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => checkAnswer(option));
    optionsContainer.appendChild(button);
  });
}

// Function to check the answer
function checkAnswer(answer) {
  const correctAnswer = questions[currentLevel][currentQuestionIndex].correct;
  if (answer === correctAnswer) {
    score++;
  }
  nextButton.classList.remove('hidden');
  prevButton.classList.remove('hidden');
  if (currentQuestionIndex === questions[currentLevel].length - 1) {
    nextButton.textContent = 'Finish Quiz';
  }
}

// Function to handle next question
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions[currentLevel].length) {
    displayQuestion();
    nextButton.classList.add('hidden');
    prevButton.classList.add('hidden');
  } else {
    endQuiz();
  }
});

// Function to handle previous question
prevButton.addEventListener('click', () => {
  currentQuestionIndex--;
  displayQuestion();
  nextButton.classList.add('hidden');
  prevButton.classList.add('hidden');
});

// Function to end the quiz and show the results
function endQuiz() {
  clearInterval(timer);
  quizScreen.classList.add('hidden');
  resultsScreen.classList.remove('hidden');
  finalScoreDisplay.textContent = `Your Score: ${score}`;
}

// Timer function
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

// Function to restart the quiz
restartButton.addEventListener('click', () => {
  resultsScreen.classList.add('hidden');
  levelScreen.classList.remove('hidden');
});

// Function to go back to the main menu
mainMenuButton.addEventListener('click', () => {
  resultsScreen.classList.add('hidden');
  welcomeScreen.classList.remove('hidden');
});

// Sign Up and Sign In functionality
const users = [];

function showPassword() {
  const passwordField = document.getElementById('password');
  passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
}

showPasswordCheckbox.addEventListener('change', showPassword);

document.getElementById('signup-btn').addEventListener('click', () => {
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  if (username && password.length >= 5) {
    users.push({ username, password });
    alert('Account created successfully');
    signupScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
  } else {
    alert('Username and password are required. Password should be at least 5 characters.');
  }
});

document.getElementById('signin-btn').addEventListener('click', () => {
  const username = document.getElementById('signin-username').value;
  const password = document.getElementById('signin-password').value;
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    alert('Sign in successful');
    signinScreen.classList.add('hidden');
    levelScreen.classList.remove('hidden');
  } else {
    alert('Invalid credentials');
  }
});
