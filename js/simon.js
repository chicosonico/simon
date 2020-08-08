
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$("#level-text").click(function () { 
    if (!started){
        $("#level-text").text("Level"+ level);
        nextSquence();
        started = true;
    }
});

$(".btn").click(function () { 
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    flashedPress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
    
  });



function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}




function flashedPress(currentColour){
 $("#" + currentColour).addClass("flash-btn");
 setTimeout(function(){
    $("#" + currentColour).removeClass("flash-btn");
}, 100);
};

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSquence();
            },1000);
        }
    }else{
        playSound("wrong");
        gettingWrong();
        startOver();
    }


}

function nextSquence(){
    userClickedPattern = [];

    level++;
    $("#level-text").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    
     for (i = 0; i < gamePattern.length; i++) {
        
            delayedPattern(i);

      }

      function delayedPattern(i){
          setTimeout(function(){
            $("#"+ gamePattern[i]).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    
            playSound(gamePattern[i]);
          }, 500*i);
      }
        
    };
    
    


function gettingWrong(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
   }, 200);
   $("#level-text").text("Game Over, Press here to Restart");
   };

   function startOver(){
    gamePattern = [];
    
    level = 0;
    
    started = false;
   };