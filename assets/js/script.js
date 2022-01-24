// Quiz questions - 8 questions total
// Variabls with array and objects
var questions = [
    {
        title: "Commonly used data types DO NOT include?",
        choices: ["strings","booleans","alerts","numbers",],
        answer: "alerts"
    },
    {
        title: "which built-in method removes the last element from an array and returns that element?",
        choices: ["last()", "get()", "pop()", "None of the above"],
        answer: "pop()"
    },
    {
        title: "Arrays in Javascript can be used to store ____",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigne dto variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        title: "Which of the following function of String object is used to match a regular expression against a string?",
        choices: ["concat()", "match()", "search()", "replace()"],
        answer: "match()"
    },
    {
        title: "What useful tool is used during development and debugging for printing content to the debugger?",
        choices: ["Javascript", "for loops", "console.log", "terminal/bash"],
        answer: "console.log"
    },
    {
        title: "Which of the following function of String object causes a string to be displayed in a small font, as if it were in a <small> tag?",
        choices: ["small()", "link()", "sup()", "sub()"],
        answer: "small()"
    },
    {
        title: "Which of the following function of Array object returns true if every element in this array satisfies the provided testing function?",
        choices: ["concat()", "every()", "push()", "some()"],
        answer: "every()"
    },
];

// Declared variables
var score = 0;
var currentIndex = 0;

// Start working code 
var currentTime = document.querySelector("#currentTime");
var sbutton = document.querySelector("#sbutton");
var quizQuestions = document.querySelector("#quizQuestions");
var container = document.querySelector("#container");

// Timing
var secondsLeft = 75;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");

// Starts time & shows user a display on the screen
sbutton.addEventListener("click", function () {
    // Shows 0 until countdown begins
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(currentIndex);
});

// Using render() for questions and choices: 
function render(currentIndex) {
    // Clear existing data 
    quizQuestions.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop info in array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[currentIndex].title;
        var userChoices = questions[currentIndex].choices;
        quizQuestions.textContent = userQuestion;
    }
    // New question appears after previous ansswered
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quizQuestions.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// 
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[currentIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[currentIndex].answer;
            // Correct condition 
        } else {
            // Will deduct -10 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[currentIndex].answer;
        }

    }
    // Question Index determines number question user is on
    currentIndex++;

    if (currentIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(currentIndex);
    }
    quizQuestions.appendChild(createDiv);

}
// All done will append last page
function allDone() {
    quizQuestions.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    quizQuestions.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    quizQuestions.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        quizQuestions.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    quizQuestions.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    quizQuestions.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    quizQuestions.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./Highscore.html");
        }
    });

}