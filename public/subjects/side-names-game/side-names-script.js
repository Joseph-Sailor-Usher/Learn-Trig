//GAME GAME GAME
var score = 0;
var sideNames = ['Hypotenuse', 'Adjacent', 'Opposite'];
var correctSideName = 'Hypotenuse';

//UI UI UI
const scoreUI = document.getElementById('ui-score');
const btnOne = document.getElementById('ui-hyp'), btnTwo = document.getElementById('ui-adj'),
btnThree = document.getElementById('ui-opp');

//EVENTS EVENTS EVENTS
btnOne.addEventListener("click", function(){
    guess(0);}, false);
btnTwo.addEventListener("click", function(){
    guess(1);}, false);
btnThree.addEventListener("click", function(){
    guess(2);}, false);

//GAME INPUT GAME INPUT GAME INPUT
function guess(choice) {
  //console.log('Guessed ' + sideNames[choice]);
  if(choice == correctSideName) {
    score++;
    //console.log('correct');
  }
  else {
    //console.log('incorrect');
    score = 0;
  }
  scoreUI.textContent = 'Score: ' + score;
  newQuestion();
}
//CANVAS CANVAS CANVAS
const sngc = document.getElementById('game-canvas');
const sngctx = sngc.getContext('2d');
resizeCanvas(sngc);


//MAIN MAIN MAIN
//draw a new question
newQuestion();
//update ui



function newQuestion() {
  sngctx.clearRect(0, 0, 600, 600);

  //get a new question
  correctSideName = Math.floor(Math.random() * Math.floor(3));  //pick which side to ask player to identify
  //console.log('The Answer is ' + sideNames[correctSideName] + ' ' + correctSideName);
  newNameThatSide(sngc, sngctx);
  //find out where to put the angle
  //find the hypotenuse
  //find out which two sides have the longest distance between them

/* DEBUG DEBUG DEBUG
  drawDot(sngctx, sOneMidX, sOneMidY, 24, 'silver');
  drawDot(sngctx, sTwoMidX, sTwoMidY, 24, 'pink');
  drawDot(sngctx, sThreeMidX, sThreeMidY, 24, 'green');
*/

  //draw the triangle and the angle, and the side indicator
  drawTriangle(sngctx, x, y, a, b, d, o, 7, 'white');
  drawDot(sngctx, x, y, 12, 'white');
  //Find out which side is the hypotenuse
  if(sideOneLength >= sideTwoLength && sideOneLength >= sideThreeLength) {
    //console.log('side one is hyp');
    //if side one is hyp, put a dot at (x, y)
    //check which of the other two sides is further away from the (x, y) angle, and assign it to be the opposite
    //if distance from midpoint of sideTwo to (x, y) is greater than distance from midpoint of sideThree to (x, y)
    if(Math.sqrt(Math.pow(sTwoMidX-x, 2) + Math.pow(sTwoMidY-y, 2)) > Math.sqrt(Math.pow(sThreeMidX-x, 2) + Math.pow(sThreeMidY-y, 2))) {
      //console.log('side two is opposite');
      //console.log('side three is adjacent');
      if(correctSideName == 0) {
        drawDot(sngctx, sOneMidX, sOneMidY, 18, 'black');
      }
      else if(correctSideName == 1) {
        drawDot(sngctx, sThreeMidX, sThreeMidY, 18, 'black');
      }
      else {
        drawDot(sngctx, sTwoMidX, sTwoMidY, 18, 'black');
      }
    }
    else {
      //console.log('side three is opposite');
      //console.log('side two is adjacent');
      if(correctSideName == 3) {
        drawDot(sngctx, sOneMidX, sOneMidY, 18, 'black');
      }
      else if(correctSideName == 2) {
        drawDot(sngctx, sTwoMidX, sTwoMidY, 18, 'black');
      }
      else {
        drawDot(sngctx, sThreeMidX, sThreeMidY, 18, 'black');
      }
    }
  }
  else if(sideTwoLength > sideOneLength && sideTwoLength > sideThreeLength) {
    //side two is the hypotenuse
    //console.log('side two is hyp');

    if(Math.sqrt(Math.pow(sThreeMidX-x, 2) + Math.pow(sThreeMidY-y, 2)) > Math.sqrt(Math.pow(sOneMidX-x, 2) + Math.pow(sOneMidY-y, 2))) {
      //console.log('side one is opposite');
      //console.log('side three is adjacent');
      if(correctSideName == 3) {
        drawDot(sngctx, sOneMidX, sOneMidY, 18, 'black');
      }
      else if(correctSideName == 2) {
        drawDot(sngctx, sThreeMidX, sThreeMidY, 18, 'black');
      }
      else {
        drawDot(sngctx, sTwoMidX, sTwoMidY, 18, 'black');
      }
    }
    else {
      //console.log('side three is opposite');
      //console.log('side one is adjacent');
      if(correctSideName == 3) {
        drawDot(sngctx, sThreeMidX, sThreeMidY, 18, 'black');
      }
      else if(correctSideName == 2) {
        drawDot(sngctx, sOneMidX, sOneMidY, 18, 'black');
      }
      else {
        drawDot(sngctx, sTwoMidX, sTwoMidY, 18, 'black');
      }
    }
  }
  else {
    //console.log('side three is hyp');
    if(Math.sqrt(Math.pow(sTwoMidX-x, 2) + Math.pow(sTwoMidY-y, 2)) < Math.sqrt(Math.pow(sOneMidX-x, 2) + Math.pow(sOneMidY-y, 2))) {
      //console.log('side one is opposite');
      //console.log('side two is adjacent');
      if(correctSideName == 0) {
        drawDot(sngctx, sThreeMidX, sThreeMidY, 18, 'black');
      }
      else if(correctSideName == 1) {
        drawDot(sngctx, sTwoMidX, sTwoMidY, 18, 'black');
      }
      else {
        drawDot(sngctx, sThreeMidX, sThreeMidY, 18, 'black');
      }
    }
    else {
      //console.log('side two is opposite');
      //console.log('side one is adjacent');
      if(correctSideName == 0) {
        drawDot(sngctx, sThreeMidX, sThreeMidY, 18, 'black');
      }
      else if(correctSideName == 1) {
        drawDot(sngctx, sOneMidX, sOneMidY, 18, 'black');
      }
      else {
        drawDot(sngctx, sTwoMidX, sTwoMidY, 18, 'black');
      }
    }
  }
}
