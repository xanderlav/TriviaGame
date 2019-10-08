
// Global variables definition
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const advance = document.getElementById("advance");
const scoreDiv = document.getElementById("scoreDisplay");

// Create question array & its answer
let bookqns = [
    {
        question : "What's Julio Cortazar's most famous book?",
        imgSrc : "assets/images/Julio-Cortazar.jpg",
        choiceA : "Ciudad de Ciegos",
        choiceB : "Crimen y Castigo",
        choiceC : "Rayuela",
        correct : "C"
    },{
        question : "Octavio Paz master piece?",
        imgSrc : "assets/images/octavio_paz.jpg",
        choiceA : "Llama Doble",
        choiceB : "Laberinto de la Soledad",
        choiceC : "Piedra de Sol",
        correct : "B"
    },{
        question : "La región más transparente, the author is:",
        imgSrc : "assets/images/carlos_fuentes.jpg",
        choiceA : "Carlos Fuentes",
        choiceB : "Rosario Castellanos",
        choiceC : "Bernardo Reyes",
        correct : "A"
    },{
        question : "Fiction book, writen by Rosario Castellanos:",
        imgSrc : "assets/images/rosario_castellanos.jpg",
        choiceA : "Balún-Canán",
        choiceB : "Yo Robot",
        choiceC : "Soy Leyenda",
        correct : "A"}
];

// create some variables

const lastQn = bookqns.length - 1;
let runningQn = 0;
let count = 0;
const qnTime = 10; 
const gaugeWidth = 200; // 200px
const gaugeUnit = gaugeWidth / qnTime;
let TIMER;
let score = 0;

// Display a question
function displayQn(){
    let q = bookqns[runningQn];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// Display screen elementrs 
function startQuiz(){
    start.style.display = "none";
    displayQn();
    quiz.style.display = "block";
    displayAdvance();
    displayCounter();
    TIMER = setInterval(displayCounter,1000); 
}

// Display advance
function displayAdvance(){
    for(let qIndex = 0; qIndex <= lastQn; qIndex++){
        advance.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// Display the counter game
function displayCounter(){
    if(count <= qnTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change advance color to red
        answerIsWrong();
        if(runningQn < lastQn){
            runningQn++;
            displayQn();
        }else{
            // Terminate the game and shows final score
            clearInterval(TIMER);
            scoreTrivia();
        }
    }
}

// Veriry user answer and changes counters

function verifyAnswer(answer){
    if( answer == bookqns[runningQn].correct){
        // answer is correct
        score++;
        // change advance color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change advance color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQn < lastQn){
        runningQn++;
        displayQn();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreTrivia();
    }
}

// If answer is right
function answerIsCorrect(){
    document.getElementById(runningQn).style.backgroundColor = "#0f0";
}

// If answer is wrong
function answerIsWrong(){
    document.getElementById(runningQn).style.backgroundColor = "#f00";
}

// score render
function scoreTrivia(){
    scoreDiv.style.display = "block";
    
    // Determine % answered by the player
    const scorePct = Math.round(100 * score/bookqns.length);
    
    // Shows the image based on the score percentage
    let img = (scorePct >= 80) ? "assets/images/concert.jpg" :
              (scorePct >= 60) ? "assets/images/almost.png" :
              (scorePct >= 40) ? "assets/images/neutral.png" :
              (scorePct >= 20) ? "assets/images/meh.png" :
              "assets/images/looser.png";
    
    scoreDiv.innerHTML = "<img src="+ img +" style=" + "width:150px;height:150px" + ">";
    scoreDiv.innerHTML += "<p style=color:" + "green" + "> Your pct was:"+ scorePct +"%</p>";
}
