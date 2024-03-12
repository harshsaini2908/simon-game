
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];




var level=0;
var started=false;

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});



function nextSequence()
{

    

    userClickedPattern=[];

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber=Math.random();
    randomNumber=randomNumber*4;
    randomNumber=Math.floor(randomNumber);
    // alert(buttonColors[randomNumber]);

    var randomChosencolor=buttonColors[randomNumber];
    $("#"+randomChosencolor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosencolor);
    gamePattern.push(randomChosencolor);
}

function playSound(color)
{
        var audio=new Audio("sounds/"+color+".mp3");
        audio.play();
}

function animatePress(color)
{
        $("#"+color).addClass("pressed");

        setTimeout(function()
        {
            $("#"+color).removeClass("pressed");
        },100);
};

$(".btn").click(function()
{
        var userChosenColor=$(this).attr("id");
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkanswer(userClickedPattern.length-1);
});

function checkanswer(idx)
{
    if(userClickedPattern[idx]===gamePattern[idx])
    {
        console.log("success");

        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
    }
    else
    {
        console.log("Wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key To Restart");
        startOver();
        

    }
}

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}