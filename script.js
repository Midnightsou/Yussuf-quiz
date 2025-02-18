// Handle User Authentication
function signUp() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    // Validation: Check if fields are empty
    if (username === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Save user to local storage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Account created! Please Sign In.");
    showSignIn();
}

function signIn() {
    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;

    // Validation: Check if fields are empty
    if (username === "" || password === "") {
        alert("Please fill in both fields.");
        return;
    }

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        alert("Login successful!");
        showWelcomeScreen();
    } else {
        alert("Incorrect username or password.");
    }
}

// Show Screens
function showSignUp() {
    document.getElementById("signup-screen").classList.remove("hidden");
    document.getElementById("signin-screen").classList.add("hidden");
}

function showSignIn() {
    document.getElementById("signin-screen").classList.remove("hidden");
    document.getElementById("signup-screen").classList.add("hidden");
}

function showWelcomeScreen() {
    document.getElementById("signin-screen").classList.add("hidden");
    document.getElementById("signup-screen").classList.add("hidden");
    document.getElementById("welcome-screen").classList.remove("hidden");
}

// Logout Function
function logout() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("signin-screen").classList.remove("hidden");
}

// Show Level Selection
function showLevelSelection() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("level-screen").classList.remove("hidden");
}

// Quiz Functionality
const questions = {
    easy: [
        ["Who was Prophet Yusuf's father?", ["Prophet Ya'qub", "Prophet Ibrahim", "Prophet Musa"], 0],
        ["What did Prophet Yusuf see in his dream?", ["Eleven stars", "A full moon", "A burning tree"], 0]
    ],
    medium: [
        ["How many brothers did Prophet Yusuf have?", ["Ten", "Eleven", "Twelve"], 1],
        ["What was the interpretation of the king’s dream?", ["Years of plenty followed by years of famine", "A new ruler will come", "Egypt will prosper"], 0]
    ],
    hard: [
        ["What was the king's dream in Prophet Yusuf's story?", ["Seven fat cows and seven thin cows", "A river overflowing", "A harvest of wheat"], 0],
        ["What happened to the king's baker after Prophet Yusuf interpreted his dream?", ["He was hanged", "He was released", "He was sent to prison"], 0]
    ]
};

let currentLevel = "";
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

function startQuiz(level) {
    currentLevel = level;
    currentQuestions = [...questions[level]].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    document.getElementById("level-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    startTimer();
}

function showQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        endQuiz();
        return;
    }

    const questionData = currentQuestions[currentQuestionIndex];
    document.getElementById("question-number").textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    document.getElementById("question-text").textContent = questionData[0];

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    questionData[1].forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = function () {
            checkAnswer(index);
        };
        optionsContainer.appendChild(btn);
    });

    document.getElementById("quiz-screen").classList.add("fade");
}

function checkAnswer(selectedIndex) {
    if (selectedIndex === currentQuestions[currentQuestionIndex][2]) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("results-screen").classList.remove("hidden");
    document.getElementById("final-score").textContent = `${score} / ${currentQuestions.length}`;
        }
