//GAME GAME GAME
var score = 0;
var sideNames = ['Hypotenuse', 'Adjacent', 'Opposite'];
var functionNames = ['Sin', 'Cos', 'Tan', 'Csc', 'Sec', 'Cot'];
var correctChoice = 0, correctFunctionName = 0,
currentSideLengths = [0, 0, 0], //Actual lengths
organizedSideLengths = [0, 0, 0]; //Side lengths Hyp Adj Opp sorted.

//UI UI UI
const scoreUI = document.getElementById('ui-score');
const btnOne = document.getElementById('ui-hyp'), btnTwo = document.getElementById('ui-adj'), btnThree = document.getElementById('ui-opp');
var btns = [btnOne, btnTwo, btnThree];
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
  if(btns[choice].innerHTML == btns[correctChoice].innerHTML) {
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
  correctChoice = Math.floor(Math.random() * Math.floor(3));  //pick which side to ask player to identify
  correctFunctionName = Math.floor(Math.random() * Math.floor(6));  //pick which side to ask player to identify
  //console.log('The Answer is ' + sideNames[correctChoice] + ' ' + correctChoice);
  newNameThatSide(sngc, sngctx);
  currentSideLengths[0] = Math.floor(sideOneLength);
  currentSideLengths[1] = Math.floor(sideTwoLength);
  currentSideLengths[2] = Math.floor(sideThreeLength);
  //draw the triangle and the angle, and the side indicator
  drawTriangle(sngctx, x, y, a, b, d, o, 7, 'white');
  drawDot(sngctx, x, y, 30, 'white');
  drawDot(sngctx, sOneMidX, sOneMidY, 30, 'black');
  drawDot(sngctx, sTwoMidX, sTwoMidY, 30, 'black');
  drawDot(sngctx, sThreeMidX, sThreeMidY, 30, 'black');

  sngctx.font = '24px monaco';
  sngctx.fillStyle = "white";
  sngctx.textAlign = "center";
  sngctx.textBaseline = "middle";
  sngctx.fillText(Math.floor(sideOneLength), sOneMidX, sOneMidY);
  sngctx.fillText(Math.floor(sideTwoLength), sTwoMidX, sTwoMidY);
  sngctx.fillText(Math.floor(sideThreeLength), sThreeMidX, sThreeMidY);
  sngctx.fillStyle = "black";
  sngctx.fillText(functionNames[correctFunctionName], x, y);
  // Find out which side is the hypotenuse
  if(sideOneLength >= sideTwoLength && sideOneLength >= sideThreeLength) {
    //console.log('side one is hyp' + Math.floor(sideOneLength));
    organizedSideLengths[0] = Math.floor(sideOneLength);
    //check which of the other two sides is further away from the (x, y) angle, and assign it to be the opposite
    //if distance from midpoint of sideTwo to (x, y) is greater than distance from midpoint of sideThree to (x, y)
    if(Math.sqrt(Math.pow(sTwoMidX-x, 2) + Math.pow(sTwoMidY-y, 2)) > Math.sqrt(Math.pow(sThreeMidX-x, 2) + Math.pow(sThreeMidY-y, 2))) {
      //console.log('side two is opposite' + Math.floor(sideTwoLength));
      organizedSideLengths[2] = Math.floor(sideTwoLength);
      //console.log('side three is adjacent' + Math.floor(sideThreeLength));
      organizedSideLengths[1] = Math.floor(sideThreeLength);
    }
    else {
      //console.log('side three is opposite');
      organizedSideLengths[2] = Math.floor(sideThreeLength);
      //console.log('side two is adjacent');
      organizedSideLengths[1] = Math.floor(sideTwoLength);
    }
  }
  else if(sideTwoLength > sideOneLength && sideTwoLength > sideThreeLength) {
    //side two is the hypotenuse
    //console.log('side two is hyp');
    organizedSideLengths[0] = Math.floor(sideTwoLength);
    if(Math.sqrt(Math.pow(sThreeMidX-x, 2) + Math.pow(sThreeMidY-y, 2)) > Math.sqrt(Math.pow(sOneMidX-x, 2) + Math.pow(sOneMidY-y, 2))) {
      //console.log('side one is opposite');
      organizedSideLengths[2] = Math.floor(sideOneLength);
      //console.log('side three is adjacent');
      organizedSideLengths[1] = Math.floor(sideThreeLength);
    }
    else {
      //console.log('side three is opposite');
      organizedSideLengths[2] = Math.floor(sideThreeLength);
      //console.log('side one is adjacent');
      organizedSideLengths[1] = Math.floor(sideOneLength);
    }
  }
  else {
    //console.log('side three is hyp');
    organizedSideLengths[0] = Math.floor(sideThreeLength);
    if(Math.sqrt(Math.pow(sTwoMidX-x, 2) + Math.pow(sTwoMidY-y, 2)) < Math.sqrt(Math.pow(sOneMidX-x, 2) + Math.pow(sOneMidY-y, 2))) {
      //console.log('side one is opposite');
      organizedSideLengths[2] = Math.floor(sideOneLength);
      //console.log('side two is adjacent');
      organizedSideLengths[1] = Math.floor(sideTwoLength);
    }
    else {
      //console.log('side two is opposite');
      organizedSideLengths[2] = Math.floor(sideTwoLength);
      //console.log('side one is adjacent');
      organizedSideLengths[1] = Math.floor(sideOneLength);
    }
  }
  /*console.log('Hyp ' + organizedSideLengths[0] + ' Adj ' + organizedSideLengths[1] + ' Opp ' + organizedSideLengths[2]);
  drawDot(sngctx, sOneMidX, sOneMidY+60, 24, 'silver');
  drawDot(sngctx, sTwoMidX, sTwoMidY+60, 24, 'pink');
  drawDot(sngctx, sThreeMidX, sThreeMidY+60, 24, 'green'); */
  generateRatioChoices();
}

function generateRatioChoices() {
  //use two numbers and reassign them
  let r1 = '69', r2 = '420';
  //console.log(sideOneLength + ' ' + r1);
  //console.log(currentSideLengths[Math.floor(Math.random() * Math.floor(3))]);
  r1 = Math.floor(currentSideLengths[Math.floor(Math.random() * Math.floor(3))]);
  //Make sure they're never the same side lengths
  r2 = Math.floor(currentSideLengths[Math.floor(Math.random() * Math.floor(3))]);
  while(r1 == r2) {
    r2 = Math.floor(currentSideLengths[Math.floor(Math.random() * Math.floor(3))]);
  }

  //randomize all three buttons
  //display the choices
  btnOne.innerHTML = r1 + '<hr>' + r2;

  r1 = Math.floor(currentSideLengths[Math.floor(Math.random() * Math.floor(3))]);
  //Make sure they're never the same side lengths
  r2 = Math.floor(currentSideLengths[Math.floor(Math.random() * Math.floor(3))]);
  while(r1 == r2) {
    r2 = Math.floor(currentSideLengths[Math.floor(Math.random() * Math.floor(3))]);
  }
  btnTwo.innerHTML = r1 + '<hr>' + r2;

  r1 = Math.floor(currentSideLengths[Math.floor(Math.random() * Math.floor(3))]);
  //Make sure they're never the same side lengths
  r2 = Math.floor(currentSideLengths[Math.floor(Math.random() * Math.floor(3))]);
  while(r1 == r2) {
    r2 = Math.floor(currentSideLengths[Math.floor(Math.random() * Math.floor(3))]);
  }
  btnThree.innerHTML = r2 + '<hr>' + r1;

  //Put the correct answer into a random button
  if(correctChoice == 0)  {
    //put the answer into this btn
    assignCorrectChoice(0);
    //make sure no duplicate choices exist


  }
  else if(correctChoice == 1)  {
    //put the answer into this btn
    assignCorrectChoice(1);

  }
  else if(correctChoice == 2)  {
    //put the answer into this btn
    assignCorrectChoice(2);

  }
}

//maps sides to functions
function assignCorrectChoice(btn) {
  //Checks which function we are quizzing over
  //Assigns a button the values of that function on the current triangle
  if(correctFunctionName == 0) {
    //we need to find out the length of the named sides
    btns[btn].innerHTML = organizedSideLengths[2] + '<hr>' + organizedSideLengths[0];
    //console.log('Sine');
  }
  else if(correctFunctionName == 1) {
    //we need to find out the length of the named sides
    btns[btn].innerHTML = organizedSideLengths[1] + '<hr>' + organizedSideLengths[0];
    //console.log('Cosine');
  }
  else if(correctFunctionName == 2) {
    //we need to find out the length of the named sides
    btns[btn].innerHTML = organizedSideLengths[2] + '<hr>' + organizedSideLengths[1];
    //console.log('Tangent' + organizedSideLengths[2] + ' ' + organizedSideLengths[1]);
  }
  else if(correctFunctionName == 3) {
    //we need to find out the length of the named sides
    btns[btn].innerHTML = organizedSideLengths[0] + '<hr>' + organizedSideLengths[2];
    //console.log('Cosecant');
  }
  else if(correctFunctionName == 4) {
    //we need to find out the length of the named sides
    btns[btn].innerHTML = organizedSideLengths[0] + '<hr>' + organizedSideLengths[1];
    //console.log('Secant');
  }
  else if(correctFunctionName == 5) {
    //we need to find out the length of the named sides
    //console.log('Cotangent');
    btns[btn].innerHTML = organizedSideLengths[1] + '<hr>' + organizedSideLengths[2];
  }
  //console.log('Assigning btn One to ' + functionNames[correctFunctionName]);

}
