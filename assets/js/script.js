var headerEl = document.querySelector("#header");
var timeEl = document.querySelector("p.time");
var scoreEl = document.querySelector("#score");
var questionEl = document.querySelector("#question");
var questionsEl = document.querySelector("#questions");
var welcomeEl = document.querySelector("#welcome");
var rightOrWrongEl = document.querySelector("#rightOrWrong");
var finalEl = document.querySelector("#final");
var initialsInput = document.querySelector("#initials");
var highscoresEl = document.querySelector("#highscores");
var scoreListEl = document.querySelector("#score-list");
var leadBoardBtn = document.querySelector("#leadboard");
var scoreList = [];
var secondsLeft = 60;
var answer1Btn = document.querySelector("#answerA");
var answer2Btn = document.querySelector("#answerB");
var answer3Btn = document.querySelector("#answerC");
var answer4Btn = document.querySelector("#answerD");
var startBtn = document.querySelector("#start");
var answerBtn = document.querySelectorAll("button.answerBtn");
var submitScrBtn = document.querySelector("#submit-score");
var viewScrBtn = document.querySelector("#view-scores");
var backBtn = document.querySelector("#back");

//questions

var questions = [
  {
    question: "JavaScript is a ___ -side programming language.",
    answers: ["1. shore", "2. client", "3. server", "4. dark"],
    correctAnswer: "1",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    answers: [
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets",
    ],
    correctAnswer: "2",
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    answers: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    correctAnswer: "3",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    correctAnswer: "2",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    correctAnswer: "3",
  },
];

//clock

function countDown() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = `⏱: ${secondsLeft}s`;

    if (secondsLeft === 0 || questionCount === questions.length) {
      clearInterval(timerInterval);
      questionsEl.style.display = "none";
      finalEl.style.display = "block";
      scoreEl.textContent = secondsLeft;
    }
  }, 1000);
}

//Start Game Function

//WHEN I click the start button
//THEN a timer starts and I am presented with a question

function startGame() {
  welcomeEl.style.display = "none";
  headerEl.style.display = "none";
  questionsEl.style.display = "block";
  questionCount = 0;

  countDown();
  setQuestion(questionCount);
}

function setQuestion(id) {
  if (id < questions.length) {
    questionEl.textContent = questions[id].question;
    answer1Btn.textContent = questions[id].answers[0];
    answer2Btn.textContent = questions[id].answers[1];
    answer3Btn.textContent = questions[id].answers[2];
    answer4Btn.textContent = questions[id].answers[3];
  }
}

//Right or Wrong consequences

function checkAnswers(event) {
  event.preventDefault();

  rightOrWrongEl.style.display = "block";
  var p = document.createElement("p");
  rightOrWrongEl.appendChild(p);

  setTimeout(function () {
    p.style.display = "none";
  }, 1000);

  //WHEN I answer a question incorrectly
  //THEN time is subtracted from the clock

  if (questions[questionCount].correctAnswer === event.target.value) {
    p.textContent = "Correct";
  } else if (questions[questionCount].correctAnswer !== event.target.value) {
    secondsLeft = secondsLeft - 10;
    p.textContent = "Incorrect";
  }

  //WHEN I answer a question
  //THEN I am presented with another question

  if (questionCount < questions.length) {
    questionCount++;
  }
  setQuestion(questionCount);
}

//leaderboard

function addScore(event) {
  event.preventDefault();

  finalEl.style.display = "none";
  highscoresEl.style.display = "block";

  var init = initialsInput.value.toUpperCase();
  scoreList.push({ initials: init, score: secondsLeft });

  scoreList = scoreList.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else {
      return -1;
    }
  });

  scoreListEl.innerHTML = "";
  for (var i = 0; i < scoreList.length; i++) {
    var li = document.createElement("li");
    li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
    scoreListEl.append(li);
  }

  storeScores();
  displayScores();
}

function storeScores() {
  localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
  var storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

  if (storedScoreList !== null) {
    scoreList = storedScoreList;
  }
}

//button functions

startBtn.addEventListener("click", startGame);

answerBtn.forEach((item) => {
  item.addEventListener("click", checkAnswers);

  submitScrBtn.addEventListener("click", addScore);
});

backBtn.addEventListener("click", function () {
  highscoresEl.style.display = "none";
  welcomeEl.style.display = "block";
  headerEl.style.display = "block";
  secondsLeft = 60;
  timeEl.textContent = `⏱: ${secondsLeft}s`;
});

viewScrBtn.addEventListener("click", function () {
  if (highscoresEl.style.display === "none") {
    highscoresEl.style.display = "block";
    welcomeEl.style.display = "none";
    headerEl.style.display = "none";
  } else if (highscoresEl.style.display === "block") {
    highscoresEl.style.display = "none";
  } else {
    return alert("Nobody here yet");
  }
});
