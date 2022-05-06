var song=""
var song2=""
var leftWristX=0
var leftWristY=0
var rightWristX=0
var rightWristY=0
var scoreLeftWrist=0
var status_song=""
var scoreRightWrist=0
var status_song2=""

function preload(){
    song=loadSound("music.mp3")
    song2=loadSound("music2.mp3")
}

function setup(){
    canvas=createCanvas(600,500)
    canvas.position(500,200)
    video=createCapture(VIDEO)
    video.hide()

    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on("poses",gotResults)
}

function draw(){
    image(video,0,0,600,500)
    fill("purple")
    stroke("purple")
    status_song=song.isPlaying()
    if(scoreLeftWrist>0.02){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(status_song==false){
            song.play()
            document.getElementById("songs").innerHTML="Song Name - PeterPan"
        }
    }
    status_song2=song2.isPlaying();
    if(scoreRightWrist>0.02){
        circle(rightWristX,rightWristY,20);
        song.stop();
        if(status_song2==false){
            song2.play()
            document.getElementById("songs").innerHTML="Song Name - Harry Potter Theme Song"
        }
    }
}

function modelLoaded(){
    console.log("poseNet is initialised")
}

function gotResults(results){
    if(gotResults.length > 0){
        console.log(results)
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftwristX= "+leftWristX+", leftWristY= "+leftWristY)

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightwrist= "+rightWristX+"rightWristY= "+rightWristY)
    }
}