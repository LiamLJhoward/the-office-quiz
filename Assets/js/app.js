let questionElement = document.querySelector("#questions");
let timerElement = document.querySelector("#time");
let choicesElement = document.querySelector("#choices");
let submitBtn = document.querySelector("#submit");
let startBtn = document.querySelector("#start");
let initialsElement = document.querySelector("#initials");
let feedbackElement = document.querySelector("#feedback");
let startScreenElement = document.getElementById("start-screen");
let endScreenElement = document.getElementById("end-screen");
let finalScoreElement = document.getElementById("final-score");
let titleElement = document.getElementById("question-title");
let currentQuestionIndex = 0;
let time = 60;
let timerId;

function startQuiz() {
  // Hide start screen at the beginning
  startScreenElement.setAttribute("class", "hide");

  // Show questions
  questionElement.removeAttribute("class");

  // Start timer
  timerId = setInterval(clockTick, 1000);
  timerElement.textContent = time;

  getQuestion();
}

function getQuestion() {
  // Show current question
  let currentQuestion = questions[currentQuestionIndex];
  titleElement.textContent = currentQuestion.title;

  // Clear previous question
  choicesElement.innerHTML = "";

  // Loop choices
  currentQuestion.choices.forEach(function (choice, i) {
    let choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.onclick = questionClick;

    // Display on page
    choicesElement.appendChild(choiceBtn);
  });
}

function questionClick() {
  // Checks if user guesses incorrect
  if (this.value !== questions[currentQuestionIndex].answer) {
    // Take time of them
    time -= 10;

    if (time < 0) {
      time = 0;
    }
    // Display updated time and shows whether right or wrong
    timerElement.textContent = time;
    feedbackElement.textContent = "Wrong!";
    feedbackElement.style.color = "red";
    feedbackElement.style.fontSize = "250%";
  } else {
    feedbackElement.textContent = "Correct!";
    feedbackElement.style.color = "green";
    feedbackElement.style.fontSize = "250%";
  }

  // Feedback 
  feedbackElement.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackElement.setAttribute("class", "feedback hide");
  }, 1000);

  // Next question
  currentQuestionIndex++;

  // Time checker
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // Stops timer
  clearInterval(timerId);

  // Show user the end screeen
  endScreenElement.removeAttribute("class");

  // Show user final score
  finalScoreElement.textContent = time;

  // Hides questions
  questionElement.setAttribute("class", "hide");
}

function clockTick() {
  // Update time
  time--;
  timerElement.textContent = time;

  // Checks if timer is less than 0
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // Get users initials
  let initials = initialsElement.value.trim();

  if (initials !== "") {
    // Retrieves users previous score
    let highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Formats score
    let newScore = {
      score: time,
      initials: initials,
    };

    // Save to local storage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // Takes you to next page
    window.location.href = "highscores.html";
  }
}

// Submit initials
submitBtn.onclick = saveHighscore;

// Starts quiz
startBtn.onclick = startQuiz;

