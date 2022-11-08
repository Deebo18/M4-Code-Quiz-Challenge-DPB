var score = 0;
var timeleft = 75;
var containerInstructionEl = document.getElementById("instruction-container");
var containerQuestionEl = document.getElementById("question-container");
var containerEndEl = document.getElementById("end-container");
var containerScoreEl = document.getElementById("score-banner");
var formInitials = document.getElementById("initials-form");
var containerHighScoresEl = document.getElementById("high-score-container");
var ViewHighScoreEl = document.getElementById("view-high-scores");
var listHighScoreEl = document.getElementById("high-score-list");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");
var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back");
var btnClearScoresEl = document.querySelector("#clear-high-scores");
var questionEl = document.getElementById("question");
var answerbuttonsEl = document.getElementById("answer-buttons");
var timeEl = document.querySelector("#time");
var gameover;
timeEl.innerText = 0;

//High score array
var HighScores = [];

//Assigns array details for the questions
var arrayShuffleQuestions;
var QuestionIndex = 0;

//The array of questions for the quiz
var questions = [
  {
    q: "Commonly used data types DO Not Include:",
    choices: [
      { choice: "1. strings" },
      { choice: "2. booleans" },
      { choice: "3. alerts" },
      { choice: "4. numbers" },
    ],
    a: "3. alerts",
  },
  {
    q: "The condition in an if / else statment is enclosed within _____.",
    choices: [
      { choice: "1. quotes" },
      { choice: "2. curly brackets" },
      { choice: "3. parentheses" },
      { choice: "4. square brackets" },
    ],
    a: "3. parentheses",
  },
  {
    q: "String values must be enclosed within _____ when being assigned to variables",
    choices: [
      { choice: "1. commas" },
      { choice: "2. curly brackets" },
      { choice: "3. quotes" },
      { choice: "4. parentheses" },
    ],
    a: "3. quotes",
  },
  {
    q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: [
      { choice: "1. JavaScript" },
      { choice: "2. terminal/bash" },
      { choice: "3. for loops" },
      { choice: "4. console.log" },
    ],
    a: "4. console.log",
  },
];

//Start time at 75. Check if game is over every second. If time left, show score.
var setTime = function () {
  timeleft = 75;

  var timecheck = setInterval(function () {
    timeEl.innerText = timeleft;
    timeleft--;

    if (gameover) {
      clearInterval(timecheck);
    }

    if (timeleft < 0) {
      showScore();
      timeEl.innerText = 0;
      clearInterval(timecheck);
    }
  }, 1000);
};

//Restarts the game when the "Go back" button is clicked on high scores page.
var startPage = function () {
  containerHighScoresEl.classList.add("hide");
  containerHighScoresEl.classList.remove("show");
  containerInstructionEl.classList.remove("hide");
  containerInstructionEl.classList.add("show");
  containerScoreEl.removeChild(containerScoreEl.lastChild);
  QuestionIndex = 0;
  gameover = "";
  timeEl.textContent = 0;
  score = 0;

  if ((correctEl.className = "show")) {
    correctEl.classList.remove("show");
    correctEl.classList.add("hide");
  }
  if ((wrongEl.className = "show")) {
    wrongEl.classList.remove("show");
    wrongEl.classList.add("hide");
  }
};

//Adds the classes to show/hide the different containers after starting the quiz.
var startGame = function () {
  containerInstructionEl.classList.add("hide");
  containerInstructionEl.classList.remove("show");
  containerQuestionEl.classList.remove("hide");
  containerQuestionEl.classList.add("show");
  //Places the questions in a randomized order.
  arrayShuffleQuestions = questions.sort(() => Math.random() - 0.5);
  setTime();
  setQuestion();
};

//Calls up the next question on the quiz.
var setQuestion = function () {
  resetAnswers();
  displayQuestion(arrayShuffleQuestions[QuestionIndex]);
};

//Removes the answer button.
var resetAnswers = function () {
  while (answerbuttonsEl.firstChild) {
    answerbuttonsEl.removeChild(answerbuttonsEl.firstChild);
  }
};

//display question information (including answer buttons)
var displayQuestion = function (index) {
  questionEl.innerText = index.q;
  for (var i = 0; i < index.choices.length; i++) {
    var answerbutton = document.createElement("button");
    answerbutton.innerText = index.choices[i].choice;
    answerbutton.classList.add("btn");
    answerbutton.classList.add("answerbtn");
    answerbutton.addEventListener("click", answerCheck);
    answerbuttonsEl.appendChild(answerbutton);
  }
};
//Displays correct! when right answer is selected.
var answerCorrect = function () {
  if ((correctEl.className = "hide")) {
    correctEl.classList.remove("hide");
    correctEl.classList.add("banner");
    wrongEl.classList.remove("banner");
    wrongEl.classList.add("hide");
  }
};
//Displays wrong! when the incorrect answer is selected.
var answerWrong = function () {
  if ((wrongEl.className = "hide")) {
    wrongEl.classList.remove("hide");
    wrongEl.classList.add("banner");
    correctEl.classList.remove("banner");
    correctEl.classList.add("hide");
  }
};

//Verify if the answer is correct. If not, minus time and points.
var answerCheck = function (event) {
  var selectedanswer = event.target;
  if (arrayShuffleQuestions[QuestionIndex].a === selectedanswer.innerText) {
    answerCorrect();
    score = score + 5;
  } else {
    answerWrong();
    score = score - 1;
    timeleft = timeleft - 10;
  }

  //Goes through the series of questions. Game is over when none are remaining.
  QuestionIndex++;
  if (arrayShuffleQuestions.length > QuestionIndex + 0) {
    setQuestion();
  } else {
    gameover = "true";
    showScore();
  }
};

//Displays the total score on screen at end of game.
var showScore = function () {
  containerQuestionEl.classList.add("hide");
  containerEndEl.classList.remove("hide");
  containerEndEl.classList.add("show");

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = "Your final score is " + score + ".";
  containerScoreEl.appendChild(scoreDisplay);
};

//Creates high score with users initial.
var createHighScore = function (event) {
  event.preventDefault();
  var initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Please enter intials");
    return;
  }

  formInitials.reset();

  var HighScore = {
    initials: initials,
    score: score,
  };

  //push and sort scores
  HighScores.push(HighScore);
  HighScores.sort((a, b) => {
    return b.score - a.score;
  });

  //clear visibile list to resort
  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild);
  }
  //create elements in order of high scores
  for (var i = 0; i < HighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "high-score";
    highscoreEl.innerHTML =
      HighScores[i].initials + " - " + HighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);
  }

  saveHighScore();
  displayHighScores();
};


//Click and submit listeners for different functions.
btnStartEl.addEventListener("click", startGame);
formInitials.addEventListener("submit", createHighScore);
ViewHighScoreEl.addEventListener("click", displayHighScores);
btnGoBackEl.addEventListener("click", startPage);
btnClearScoresEl.addEventListener("click", clearScores);
