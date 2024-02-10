//elements
window.addEventListener('load', startGame);
var b = document.getElementById("board");
var uiScore = document.getElementById("ui-score");
var uiRADS = document.getElementById("ui-rads");
var uiDEGS = document.getElementById("ui-degs");
var uiSINE = document.getElementById("ui-sine");
var uiCOSI = document.getElementById("ui-cosi");
var uiGuide = document.getElementById("ui-guide");
var ui1 = document.getElementById("ui-1");
var ui2 = document.getElementById("ui-2");
var ui3 = document.getElementById("ui-3");
var ui4 = document.getElementById("ui-4");
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
//element events
window.addEventListener('resize', resizeCanvas);
uiRADS.addEventListener('click', setSubjectRads);
uiDEGS.addEventListener('click', setSubjectDegs);
uiSINE.addEventListener('click', setSubjectSine);
uiCOSI.addEventListener('click', setSubjectCosi);
ui1.addEventListener('click', guess1);
ui2.addEventListener('click', guess2);
ui3.addEventListener('click', guess3);
ui4.addEventListener('click', guess4);
c.addEventListener('click', canvasClicked);
function guess1() {guess(0);}
function guess2() {guess(1);}
function guess3() {guess(2);}
function guess4() {guess(3);}


function setSubjectRads() {
    radsOrDegs = 0;
    uiGuide.textContent = 'Which Radian matches?';
    currentProblemSource = 0;
    startGame();
}
function setSubjectDegs()  {
    uiGuide.textContent = 'What Degree matches?';
    currentProblemSource = 1;
    startGame();
}
function setSubjectSine() {
    uiGuide.textContent = 'What is Sine at this angle?';
    currentProblemSource = 2;
    startGame();
}
function setSubjectCosi() {
    uiGuide.textContent = 'What is Cosine at this angle?';
    currentProblemSource = 3;
    startGame();
}

//information button
function showInfo() {
  window.location = 'about.html';
  //window.scrollTo(0,document.body.scrollHeight);
}

//element event responses
function guess(source) {
  //console.log(userGuess);
  //console.log('User guessed ' + source + ' answer was ' + correctUI);
  //check if the user is correct of incorrect
  //console.log(getFromArray(currentProblemSource, source) + " & " + getFromArray(currentProblemSource, correctUI));
  //console.log(getFromArray(currentProblemSource, choices[source]) + " & " + getFromArray(currentProblemSource, choices[correctUI]));
  if(getFromArray(currentProblemSource, choices[source]) == getFromArray(currentProblemSource, choices[correctUI])) {
    //console.log('correct');
    playing = false;
    score++;
    outcome = true;
    uiScore.textContent = score;
    if(!animating) {
      window.requestAnimationFrame(animatedResult, true);
    }
  }
  else {
    //console.log('incorrect');
    playing = false;
    outcome = false;
    score = 0;
    if(!animating) {
      window.requestAnimationFrame(animatedResult, false);
    }
  }
  userGuess = choices[source];
  drawArc(rads[userGuess]);
}

function canvasClicked() {
  //console.log('canvas clicked');
  if(playing){
    //respond somehow idk
    startGame();
  }
  else {
    startGame();
  }
}

//called on window.load and when not playing and canvasClicked
function startGame() {
  resizeCanvas();
  playing = true;
  drawUnitCircle();
  //randomize a new prompt and a set of answers
  randomPuzzle();
}


//Sizes
var column, w, h, cw;

//game variables
var playing = true; //used to switch between drawing unit circle & results page
var userGuess = 0;
var answer = 0;
var correctUI = 0;
var outcome = true;
var score = 0;
var animatedScore = 0;
//choices stores the pallet of choices as index values from 0-16
var choices = [0,0,0,0];
var p = Math.PI;
var choices = [p, p/2, 2*p, p/4];
var radsOrDegs = 0;
var rads = [0, Math.PI/6, Math.PI/4, Math.PI/3, Math.PI/2, 2*Math.PI/3, 3*Math.PI/4, 5*Math.PI/6, Math.PI, 7*Math.PI/6, 5*Math.PI/4, 4*Math.PI/3, 3*Math.PI/2, 5*Math.PI/3, 7*Math.PI/4, 11*Math.PI/6, 2*Math.PI]; //basic radians
var degs = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];
var engRads = ['0', 'π/6', 'π/4', 'π/3', 'π/2', '2π/3', '3π/4', '5π/6', 'π', '7π/6', '5π/4', '4π/3', '3π/2', '5π/3', '7π/4', '11π/6', '2π']; //radians in english
var sinVals = ['0', '√1/2', '√2/2', '√3/2', '1', '√3/2', '√2/2', '√1/2', '0', '-√1/2', '-√2/2', '-√3/2', '-1', '-√3/2', '-√2/2', '-√1/2', '0'];
var cosVals = ['1', '√3/2', '√2/2', '√1/2', '0', '-√1/2', '-√2/2', '-√3/2', '-1', '-√3/2', '-√2/2', '-√1/2', '0', '√1/2', '√2/2', '√3/2', '1']
function getFromArray(source, index) {
  if(source == 0) {
    //console.log(engRads[index]);
    return engRads[index];
  }
  else if(source == 1) {
    //console.log(engRads[index]);
    return degs[index];
  }
  else if(source == 2) {
    //console.log(engRads[index]);
    return sinVals[index];
  }
  else {
    //console.log(engRads[index]);
    return cosVals[index];
  }
}
var currentProblemSource = 0;
function randomPuzzle() {
  //console.log("new PUZZLE NEW puzzle");
  //find the new answer
  answer = Math.floor(Math.random() * Math.floor(17));
  drawHand(rads[answer], 1);
  //update prompts
  correctUI = Math.floor(Math.random() * Math.floor(4));
  let currentPrompt = Math.floor(Math.random() * Math.floor(17));
  //make sure none of the other options are the answer
  while(currentPrompt == answer) {
    currentPrompt = Math.floor(Math.random() * Math.floor(17));
    //console.log("dupe");
  }
  //display rads or Degrees and keep track of the value of each choice
  ui1.textContent = getFromArray(currentProblemSource, currentPrompt);
  choices[0] = currentPrompt;

  //randomize each option
  currentPrompt = Math.floor(Math.random() * Math.floor(17))
  while(currentPrompt == answer) {
    currentPrompt = Math.floor(Math.random() * Math.floor(17));
    //console.log("dupe");
  }
  ui2.textContent = getFromArray(currentProblemSource, currentPrompt);
  choices[1] = currentPrompt;

  currentPrompt = Math.floor(Math.random() * Math.floor(17))
  while(currentPrompt == answer) {
    currentPrompt = Math.floor(Math.random() * Math.floor(17));
    //console.log("dupe");
  }
  ui3.textContent = getFromArray(currentProblemSource, currentPrompt);
  choices[2] = currentPrompt;

  currentPrompt = Math.floor(Math.random() * Math.floor(17))
  while(currentPrompt == answer) {
    currentPrompt = Math.floor(Math.random() * Math.floor(17));
    //console.log("dupe");
  }
  ui4.textContent = getFromArray(currentProblemSource, currentPrompt);
  choices[3] = currentPrompt;

  //randomly put the answer in one of the options
  if(correctUI == 0) {
    ui1.textContent = getFromArray(currentProblemSource, answer);
    choices[0] = answer;
  }
  else if(correctUI == 1) {
    ui2.textContent = getFromArray(currentProblemSource, answer);
    choices[1] = answer;

  }
  else if(correctUI == 2) {
    ui3.textContent = getFromArray(currentProblemSource, answer);
    choices[2] = answer;
  }
  else if(correctUI == 3) {
    ui4.textContent = getFromArray(currentProblemSource, answer);
    choices[3] = answer;
  }
  //console.log(choices[0]);
  //console.log(choices[1]);
  //console.log(choices[2]);
  //console.log(choices[3]);
  //console.log(answer);
}

//UI chungus
function resizeCanvas() {
  w = window.innerWidth;
  h = window.innerHeight;
  cw = c.innerWidth;
  column = w/12;
  w -= column;
  //if in portrait mode
  if(w < h*0.7) {
    c.width = w;
    c.height = w;
    b.width = w;
    b.height = w;
  }
  else {
    c.width = h/1.5;
    c.height = h/1.5;
    b.width = h/1.5;
    b.height = h/1.5;
  }
  drawUnitCircle();
  drawHand(rads[answer], 1);
  //draw sine display
}

//rotate to an angle over a few seconds
function drawArc(angle) {
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = c.width/200;
  ctx.arc(c.width/2, c.height/2, c.width/2.8, 0, -angle,true);
  ctx.stroke();
  //origin dot
  ctx.beginPath();
  ctx.fillStyle = 'rgb(143, 188, 143)';
  ctx.arc(c.width/2+c.width/2.8, c.height/2, c.width/42, 0, 2 * Math.PI);
  ctx.fill();
  //terminal dot
  ctx.beginPath();
  ctx.fillStyle = "indianred";
  ctx.arc((c.width/2) + (c.width/2.8)*Math.cos(angle), (c.width/2) - (c.width/2.8)*Math.sin(angle), c.width/42, 0, 2 * Math.PI);
  ctx.fill();
}

//called when a new angle has been randomly chosen
function drawHand(angle, color) {
  if(currentProblemSource == 2) {
    ctx.beginPath();
    ctx.lineWidth = c.width/66;
    ctx.strokeStyle = 'rgba(255, 102, 102,1)';
    //draw a vertical line from terminal point to x-axis
    ctx.moveTo(c.width/2 + (c.width/2.8)*Math.cos(angle), c.width/2);
    ctx.lineTo((c.width/2) + (c.width/2.8)*Math.cos(angle), (c.width/2) - (c.width/2.8)*Math.sin(angle));
    //console.log(Math.cos(angle), + Math.sin(angle));
    ctx.stroke();
  }
  else if(currentProblemSource == 3) {
    ctx.beginPath();
    ctx.lineWidth = c.width/66;
    ctx.strokeStyle = 'rgba(143, 188, 143,1)';
    //draw a vertical line from terminal point to x-axis
    ctx.moveTo(c.width/2, c.width/2 - (c.width/2.8)*Math.sin(angle));
    ctx.lineTo((c.width/2) + (c.width/2.8)*Math.cos(angle), (c.width/2) - (c.width/2.8)*Math.sin(angle));
    ctx.stroke();
  }
  if(color == 0) {
    ctx.lineWidth = c.width/132;
    ctx.strokeStyle = 'black';
  }
  else {
    ctx.lineWidth = c.width/66;
    ctx.strokeStyle = 'white';
  }
  //line from center to angle at edge of unit circle
  ctx.beginPath();
  ctx.moveTo(c.width/2,c.width/2);
  ctx.lineTo((c.width/2) + (c.width/2.8)*Math.cos(angle), (c.width/2) - (c.width/2.8)*Math.sin(angle));
  //console.log(Math.cos(angle), + Math.sin(angle));
  ctx.stroke();
  /**line from angle and unit circle intersection to the x-axis
  ctx.beginPath();
  ctx.moveTo((c.width/2) + (c.width/2.8)*Math.cos(angle), (c.width/2) - (c.width/2.8)*Math.sin(angle));
  console.log(Math.cos(angle), + Math.sin(angle));
  ctx.lineTo((c.width/2) + (c.width/2.8)*Math.cos(angle), (c.width/2));
  ctx.stroke();
  */
  if(color) {
    drawArc(angle);
  }
}

//called when (re)starting the game
function drawUnitCircle() {
    clearCanvas();
    //y&z axis
    drawHand(rads[0], 0);
    drawHand(rads[4], 0);
    drawHand(rads[8], 0);
    drawHand(rads[12], 0);
    //unit circle
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = c.width/33;
    ctx.arc(c.width/2, c.height/2, c.width/2.8, 0, 2 * Math.PI);
    ctx.stroke();
    //center dot
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(c.width/2, c.height/2, c.width/42, 0, 2 * Math.PI);
    ctx.fill();
}

//called at the beginning of drawing new things on canvas
function clearCanvas() {
  ctx.clearRect(0, 0, c.width, c.height);
}

function drawAllAngles() {
  for(i = 0; i < 16; i++) {
    drawHand(rads[i]);
  }
}

//chungus ˚

//play a 1 second animation when the player makes a choice
var animating = null;
function animatedResult(timestamp) {
  if (!animating) {
    animating = timestamp;
    animatedScore = score;
  }
  var progress = timestamp - animating;

  if(outcome == true) {
    ctx.strokeStyle = 'rgba(143, 188, 143,0.1)';
  }
  else {
    ctx.strokeStyle = 'rgba(255, 102, 102,0.1)';
    if(score > 0) {
      score-=(animatedScore/50);
    }
    uiScore.textContent = score;
  }
  //draw an expanding circle
  ctx.beginPath();
  ctx.lineWidth = c.width;
  ctx.arc(c.width/2, c.height/2, c.width*(progress/250), 0, 2 * Math.PI);
  ctx.stroke();
  //timeout after 2 seconds
  if (progress < 250) {
    window.requestAnimationFrame(animatedResult, outcome);
  }
  else {
    animating = null;
    startGame();
  }
}
