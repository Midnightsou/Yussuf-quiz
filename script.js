document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const welcomeScreen = document.getElementById('welcome-screen');
  const signupScreen = document.getElementById('signup-screen');
  const signinScreen = document.getElementById('signin-screen');
  const levelScreen = document.getElementById('level-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const resultsScreen = document.getElementById('results-screen');
  const startQuizBtn = document.getElementById('start-quiz-btn');
  const signupBtn = document.getElementById('signup-btn');
  const signinBtn = document.getElementById('signin-btn');
  const signupForm = document.getElementById('signup-form');
  const signinForm = document.getElementById('signin-form');
  const showSignupPassword = document.getElementById('show-signup-password');
  const showSigninPassword = document.getElementById('show-signin-password');
  const restartBtn = document.getElementById('restart-btn');
  const returnBtn = document.getElementById('return-btn');

  let users = [];
  let currentLevel = "";
  let currentQuestionIndex = 0;
  let currentScore = 0;
  let currentQuestions = [];

  // Questions for each level
  const questions = {
    easy: [
      { question: "Who was the father of Prophet Yusuf?", options: ["Prophet Ya'qub", "Prophet Ibrahim", "Prophet Musa", "Prophet Muhammad"], correct: 0 },
      { question: "Which king had a dream that Prophet Yusuf interpreted?", options: ["King Pharaoh", "King Nebuchadnezzar", "King Nimrod", "King Herod"], correct: 0 },
      { question: "What was the profession of Prophet Yusuf's brothers?", options: ["Shepherds", "Farmers", "Merchants", "Soldiers"], correct: 0 },
      { question: "Who was the person who bought Prophet Yusuf as a slave in Egypt?", options: ["Al-Aziz", "Pharaoh", "Haman", "Imam Ali"], correct: 0 },
      { question: "What was the dream Prophet Yusuf had?", options: ["Eleven stars and the sun and moon", "Seven cows and seven ears of corn", "A lion and a wolf", "A flying horse"], correct: 0 },
      // Add more questions as needed (total 20 questions for easy level)
    ],
    medium: [
      { question: "What was the name of Prophet Yusuf’s mother?", options: ["Rahil", "Hannah", "Asiyah", "Amina"], correct: 0 },
      { question: "Who tried to seduce Prophet Yusuf?", options: ["The wife of Al-Aziz", "The daughter of Pharaoh", "The daughter of Imran", "The wife of Harun"], correct: 0 },
      { question: "Which animal did Prophet Yusuf's brothers use to deceive their father about his death?", options: ["Wolf", "Lion", "Goat", "Snake"], correct: 0 },
      { question: "How many years was Prophet Yusuf imprisoned?", options: ["Seven", "Ten", "Twelve", "Fourteen"], correct: 0 },
      { question: "Which city was Prophet Yusuf taken to as a slave?", options: ["Egypt", "Jerusalem", "Makkah", "Medina"], correct: 0 },
      // Add more questions as needed (total 20 questions for medium level)
    ],
    hard: [
      { question: "What did Prophet Yusuf's brothers do to him after they threw him in the well?", options: ["They lied to their father", "They rescued him", "They set him free", "They killed him"], correct: 0 },
      { question: "How did Prophet Yusuf react when his brothers came to him for help in Egypt?", options: ["He forgave them", "He punished them", "He sent them away", "He ignored them"], correct: 0 },
      { question: "What did Prophet Yusuf interpret as a sign from Allah when he was in prison?", options: ["The dreams of two prisoners", "A vision of the Kaaba", "The moon in the sky", "A voice calling him"], correct: 0 },
      { question: "Who was the only person who believed in Prophet Yusuf's innocence when he was accused?", options: ["Al-Aziz's wife", "Al-Aziz", "His brothers", "The king of Egypt"], correct: 0 },
      { question: "What is the meaning of the name 'Yusuf'?", options: ["God increases", "God saves", "God loves", "God creates"], correct: 0 },
      // Add more questions as needed (total 20 questions for hard level)
    ]
  };

  // Show password toggle
  showSignupPassword.addEventListener('change', function () {
    const passwordField = document.getElementById('signup-password');
    passwordField.type = this.checked ? 'text' : 'password';
  });

  showSigninPassword.addEventListener('change', function () {
    const passwordField = document.getElementById('signin-password');
    passwordField.type = this.checked ? 'text' : 'password';
  });

  // Start Quiz button - Show Sign In or Sign Up page
  startQuizBtn.addEventListener('click', function () {
    welcomeScreen.classList.add('hidden');
    signinScreen.classList.remove('hidden');
  });

  // Sign Up button - Handle Sign Up
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    // Validation
    if (username && password.length >= 5) {
      users.push({ username, password });
      alert('Account created successfully!');
      signinScreen.classList.remove('hidden');
      signupScreen.classList.add('hidden');
    } else {
      alert('Username and password must be at least 5 characters.');
    }
  });

  // Sign In button - Handle Sign In
  signinForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;

    // Check if the user exists
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      signinScreen.classList.add('hidden');
      levelScreen.classList.remove('hidden');
    } else {
      alert('Invalid username or password');
    }
  });

  // Level selection buttons
  document.getElementById('easy-btn').addEventListener('click', function () {
    currentLevel = 'easy';
    currentQuestions = shuffleArray(questions.easy);
    startQuiz();
  });

  document.getElementById('medium-btn').addEventListener('click', function () {
    currentLevel = 'medium';
    currentQuestions = shuffleArray(questions.medium);
    startQuiz();
  });

  document.getElementById('hard-btn').addEventListener('click', function () {
    currentLevel = 'hard';
    currentQuestions = shuffleArray(questions.hard);
    startQuiz();
  });

  // Start Quiz based on selected level
  function startQuiz() {
    levelScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    currentScore = 0;
    currentQuestionIndex = 0;
    displayQuestion();
  }

  // Display Question
  function displayQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    questionText.textContent = question.question;

    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.addEventListener('click', () => checkAnswer(index));
      optionsContainer.appendChild(button);
    });
  }

  // Check answer and move to next question
  function checkAnswer(selectedIndex) {
    const question = currentQuestions[currentQuestionIndex];
    if (selectedIndex === question.correct) {
      currentScore++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
      displayQuestion();
    } else {
      showResults();
    }
  }

  // Show Results
  function showResults() {
    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    document.getElementById('final-score').textContent = `Your score: ${currentScore} / 20`;
  }

  // Restart button - Restart Quiz
  restartBtn.addEventListener('click', function () {
    quizScreen.classList.remove('hidden');
    resultsScreen.classList.add('hidden');
    currentQuestionIndex = 0;
    currentScore = 0;
    displayQuestion();
  });

  // Return button - Go back to Welcome Screen
  returnBtn.addEventListener('click', function () {
    resultsScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
  });

  // Shuffle array function to randomize questions
  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
});
