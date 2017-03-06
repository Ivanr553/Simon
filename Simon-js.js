var on = false;
var strict = false;
var count = [];
var replaying = false;
var playing = false;
var playerc = 0;
var buttons = ["button-r", "button-g", "button-b", "button-y"];
var soundr = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var soundg = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var soundb = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var soundy = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var sounde = new Audio("http://res.cloudinary.com/ivanrwd/video/upload/v1488749601/Wrong-answer-sound-effect_vk0xeo.mp3");
  sounde.volume = 0.1;
var speed = 1000;

function addcolor() {
  document.getElementById("button-r").style.backgroundColor = "rgb(237, 7, 7)";
  document.getElementById("button-g").style.backgroundColor = "rgb(1, 173, 27)";
  document.getElementById("button-b").style.backgroundColor = "rgb(31, 70, 226)";
  document.getElementById("button-y").style.backgroundColor = "rgb(255, 255, 17)";
}

function onoff() {
  if(on) {
    console.log("off");
    playing = false;
    count = [];
    document.getElementById("counter").innerHTML = "";
    on = false;
  }
  else {
    addcolor();
    document.getElementById("counter").innerHTML = "--";
    console.log("on");
    on = true;
  }
}

function start() {
  if(!on) {
    return "off";
  }
  console.log("start");
  count = [];
  document.getElementById("counter").innerHTML = "00";
  playing = true;
  var first = 0+ (Math.floor((Math.random()*10))*3)/10;
  addc(buttons[first]);
  replay();
}

function mode() {
  if(!on || playing) {
    return console.log("null");
  }
  if(strict) {
    console.log("strict off");
    document.getElementById("light").style.boxShadow = "";
    document.getElementById("light").style.opacity = "0.5";
    strict = false;
  }
  else {
    console.log("strict on");
    document.getElementById("light").style.boxShadow = "0px 0px 10px red";
    document.getElementById("light").style.opacity = "1";
    strict = true;
  }
}

function addc() {
  if(!on) {
    return "off";
  }
  var num = (Math.floor(Math.random()*4));
  count.push(buttons[num]);
  if(count.length < 10){
  document.getElementById("counter").innerHTML = "0" + count.length;
}
  if(count.length >=10 ) {
    document.getElementById("counter").innerHTML = count.length;
  }
  if(count.length > 20) {
    document.getElementById("counter").style.fontSize = "22px";
    document.getElementById("counter").innerHTML = "WIN!"
  }
}

function playit(p) {
  if(!on) {
    return "off";
  }
  //check and make sure this sets it appropriately, if not then use a timer and create functions for the opacity
p.style.opacity = 1;
setTimeout(function() {return p.style.opacity = 0.5;}, 300);
if(p.style.backgroundColor === "rgb(237, 7, 7)") {
  console.log("playing");
  soundr.play();
}
if(p.style.backgroundColor === "rgb(1, 173, 27)") {
  soundg.play();
}
if(p.style.backgroundColor === "rgb(31, 70, 226)") {
  soundb.play();
}
if(p.style.backgroundColor === "rgb(255, 255, 17)") {
  soundy.play();
}
}
function buffer(i) {
  return setTimeout(function() {
    if(i === count.length-1) {
      console.log("done replaying");
      replaying = false;
    }
      playit(document.getElementById(count[i]));
    },(i * speed)+1000);
}

function replay() {
  if(!on || replaying) {
    return console.log("off");
  }
  if(count.length > 5) {
  speed = 700;
}
if(count.length > 10) {
  speed = 500;
}
if(count.length > 15) {
  speed = 300;
}
  replaying = true;
  playerc = 0;
  for(var i = 0; i < count.length; i++) {
    buffer(i);
  }
}

function interact(n) {
  if(!on || replaying) {
    return console.log("null");
  }
  else if(!playing){
    return console.log("not playing");
  }
  else {
  console.log(n.id);
  if(n.id === count[playerc]) {
    playit(n);
    playerc += 1;
    if(playerc === count.length) {
      addc();
      setTimeout(replay(), 1000);
    }
  }
  else {
    if(strict) {
      console.log("wrong");
      setTimeout(sounde.play(), 1500);
      count = [];
      playerc = 0;
      document.getElementById("counter").innerHTML = "00";
      setTimeout(start(), 5000);
    }
    else {
      console.log("wrong");
      document.getElementById("counter").innerHTML = "!!";
      setTimeout(function(){
        if(count.length < 10){
          document.getElementById("counter").innerHTML = "0" + count.length;
        }
        if(count.length >=10 ) {
          document.getElementById("counter").innerHTML = count.length;
        }
      }, 1100);
      setTimeout(sounde.play(), 1500);
      setTimeout(function replay() {
          if(!on || replaying) {
            return console.log("off");
          }
          if(count.length > 5) {
          speed = 700;
          }
          if(count.length > 10) {
            speed = 500;
          }
          if(count.length > 15) {
            speed = 300;
          }
          replaying = true;
          playerc = 0;
          for(var i = 0; i < count.length; i++) {
            buffer(i);
          }
        }, 500);
  }
  }
}
}
