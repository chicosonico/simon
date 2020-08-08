// console.log("hello");
// alert("hello");

var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keypress(function () { 
    if (!started){
        $("#level-tittle").text("Level"+ level);
        nextSquence();
        started = true;
    }
});

$(".btn").click(function () { 
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    
    console.log(userClickedPattern);

    playSound(userChosenColour);
    animatedPress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
    
  });



function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}




function animatedPress(currentColour){
 $("#" + currentColour).addClass("pressed");
 setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
}, 100);
};

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSquence();
            },1000);
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        gettingWrong();
        startOver();
    }


}

function nextSquence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    // console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    // console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    // console.log(gamePattern);


    
     for (i = 0; i < gamePattern.length; i++) {
        
            delayedPattern(i);

      }

      function delayedPattern(i){
          setTimeout(function(){
            console.log(gamePattern[i]);
            $("#"+ gamePattern[i]).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    
            playSound(gamePattern[i]);
          }, 500*i);
      }


    // $(gamePattern).each(function(index){
    //     setTimeout(function(){

    //         console.log(gamePattern);
    //     $("#"+ gamePattern[index]).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);

    //     playSound(gamePattern[index]);
            
    //     },1000);

    // })
        
    };
    
    


function gettingWrong(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
   }, 200);
   $("#level-title").text("Game Over, Press Any Key to Restart");
   };

   function startOver(){
    gamePattern = [];
    
    level = 0;
    
    started = false;
   };