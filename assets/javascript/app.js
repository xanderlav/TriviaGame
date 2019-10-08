
// Global variables definition

var conWins = 0;
var conLoos = 0;
var conUnan = 0;
var intervalId;
var number = 100;

var gameCuestion = [{
    idQtn:1,
    txtQtn:"¿El libro más conocido de Julio Cortázar?",
    txtwResp:"Rayuela",
    txtdResp:["La región más transparente", "Ciudad de Perros", "Historia de dos ciudades"]
}]

function startGame(){
// Detect button click and starts countdown
    $("#startBtn").on("click", function(){

        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);

    });
}

//  The decrement function.
    function decrement() {

    //  Decrease number by one.
        number--;
  
    //  Show the number in the #show-number tag.
        $("#showNumber").html("<h2>" + number + "</h2>");
        //showQuestions();
  
  
    //  Once number hits zero...
        if (number === 0) {
  
          //  ...run the stop function.
          stop();
  
          //  Alert the user that time is up.
          alert("Your time's Up!");
          clearInterval(intervalId);  
        }
      }

    //  The stop function
    function stop() {

        //  Clears intervalId
        clearInterval(intervalId);
      }
      
//startGame();
showQuestions();

function showQuestions(){
    if (number>0){

        $("#gameQuestions").append("<h3>" + gameCuestion[0].txtQtn + "</h3>");
        $("#gameQuestions").append("<h2>" + gameCuestion[0].txtdResp[0] + "</h2> \n")
        $("#gameQuestions").append("<h2>" + gameCuestion[0].txtdResp[1] + "</h2> \n")
        $("#gameQuestions").append("<h2>" + gameCuestion[0].txtdResp[2] + "</h2> \n")
        $("#gameQuestions").append("<h2>" + gameCuestion[0].txtwResp + "</h2> \n")
    }
}