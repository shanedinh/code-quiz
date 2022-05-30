var startButton = document.querySelector(".start")
var infoBox = document.querySelector(".quiz-info-box")
var quizBox = document.querySelector(".quiz-box")
var quizResults = document.querySelector(".quiz-results")
var timeText = document.querySelector(".time-left")
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
    }];

 var nextButton = document.querySelector(".next");
 const footerCount = document.querySelector(".question-number");
 var q_count = 0;
 var q_total = 4;
 var q_number = 0;
 var timeValue = 15;
 var counter;
 var userScore = 0;


startButton.onclick = function() {
    nextButton.style.display = "block";
    infoBox.style.display = "none";
    console.log("start button clicked!");
    quizBox.style.display = "block";
    showQuestions(q_count);
    startTimer(15);
}

nextButton.onclick = function() {
    if (q_count < 5) {
        q_count++;
        q_number++;
        showQuestions(q_count);
        clearInterval(counter);
        startTimer(timeValue);
        nextButton.style.display = "block";
    }
    else {
        clearInterval(counter);
        showResult();
    }
}




function showQuestions(index) {
    var choiceText = document.querySelector(".answer-text")
    var questionText = document.querySelector(".question-text")

    var q_number = questions[index].number + ". " + questions[index].title;
        
    
    var optionNumber = '<div class="option"><span> '+ questions[index].choices[0] +'</input></span></div>'
    + '<div class="option"><span>'+ questions[index].choices[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].choices[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].choices[3] +'</span></div>';
    
    questionText.innerHTML = q_number;
    choiceText.innerHTML = optionNumber; // new div inside option tag

    for (i = 0; i < choiceText.length; i++) {
        choiceText[i].setAttribute('onclick', optionSelected(this));
    }
}

function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAnswer = answer.textContent; //getting user selected option
    let correctAns = questions[q_count].answer; //getting correct answer from array
    const allOptions = choiceText.children.length; //getting all option items
    
    if(userAnswer == correctAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(choiceText.children[i].textContent == correctAns){ //if there is an option which is matched to an array answer 
                choiceText.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                choiceText.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        choiceText.children[i].style.display = "none"; //once user select an option then disabled all options
    }
    nextButton.style.display = "block"; //show the next button if user selected any option
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = choiceText.children.length; //getting all option items
            let correctAns = questions[q_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(choiceText.children[i].textContent == correctAns){ //if there is an option which is matched to an array answer
                    choiceText.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    choiceText.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                choiceText.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            nextButton.style.display = "block"; //show the next button if user selected any option
        }
    }
}

function showResult() {
    infoBox.style.display = "none";
    quizBox.style.display = "none";
    quizResults.style.display = "block";
    var scoreText = quizResults.querySelector(".score");

    scoreText.innerHTML = userScore;
}