var startButton = document.querySelector(".start")
var infoBox = document.querySelector(".quiz-info-box")
var quizBox = document.querySelector(".quiz-box")
var timeCount = document.querySelector(".timer-seconds")

var questions = [
    { number: 1,
      title: 'JavaScript is a ___ -side programming language.',
      choices: ['shore', 'client', 'server', 'dark'],
      answer: 'client',
    },
    { number: 2,
      title: 'The condition in an if / else statement is enclosed within ____.',
      choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
      answer: 'parentheses',
    },
    { number: 3,
      title: 'Arrays in JavaScript can be used to store ____.',
      choices: [
        'numbers and strings',
        'other arrays',
        'booleans',
        'all of the above',
      ],
      answer: 'all of the above',
    },
    { number: 4,
      title:
        'String values must be enclosed within ____ when being assigned to variables.',
      choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
      answer: 'quotes',
    },
    { number: 5,
      title:
        'A very useful tool used during development and debugging for printing content to the debugger is:',
      choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
      answer: 'console.log',
    }]

    function showQuestions(index) {
        var question_text = document.querySelector(".question-text");
            var q_number = questions[index].number + ". " + questions[index].title;
                question_text.innerHTML = q_number;
            // var choice = questions[index].number + questions[index].choices[0] + question[index].choices[1];
            //     options.innerHTML = choice;
    }

    function showChoices(index) {
        var answer_text = document.querySelector(".answer-text");
        var choice_tag = '<div class="option"><span>'+ questions[index].choices[0] +'</span></div>'
        + '<div class="option"><span>'+ questions[index].choices[1] +'</span></div>'
        + '<div class="option"><span>'+ questions[index].choices[2] +'</span></div>'
        + '<div class="option"><span>'+ questions[index].choices[3] +'</span></div>';
         answer_text.innerHTML = choice_tag;
    }

    startButton.onclick = function() {
        infoBox.style.display = 'none';
        startButton.style.display = 'none';
        console.log('start button clicked');
        // question 1
        quizBox.style.display = 'block';
        showQuestions(0);
        showChoices(0);
        startTimer(15);
    }

    // choice_tag.onclick = function() {
    //     if ()
    // }

    function startTimer(time) {
        counter = setInterval(timer, 1000);
        function timer() {
            timeCount.textContent = time;
            time--;
        }
        if (time < 0) {
            clearInterval(startTimer);
            timeCount.textContent = "Time End";
            return;
        }
    }

// code Walter helped me with ---
// startButton.onclick = function() {
//     infoBox.style.display = "none";
//     console.log("start button clicked");
//     // question 1
//     var question = document.createElement("p");
//     question.innerHTML = String(questions[0].title);
//     document.body.append(question);
//     var choice1 = document.createElement("p");
//     choice1.innerHTML = String(questions[0].choices[2]);
//     document.body.append(choice1);

//     if (question[0].choices[2] === question[0].answer) {}
// }