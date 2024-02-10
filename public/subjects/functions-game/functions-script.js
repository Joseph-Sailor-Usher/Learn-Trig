//GAME GAME GAME
var score = 0;
var sideNames = ['Hypotenuse', 'Adjacent', 'Opposite'];
var correctAnswer = 'Hypotenuse';

//function identity arrays
var functionNames = ['Sine', 'Cosine', 'Tangent', 'Cosecant', 'Secant', 'Cotangent'];
var functionNume = ['Opposite', 'Adjacent','Opposite', 'Hypotenuse', 'Hypotenuse', 'Adjacent'];
var functionDeno = ['Hypotenuse', 'Hypotenuse','Adjacent', 'Opposite', 'Adjacent', 'Opposite'];

//UI UI UI
const scoreUI = document.getElementById('ui-score');
const btnOne = document.getElementById('ui-sine'),
btnTwo = document.getElementById('ui-cosine'),
btnThree = document.getElementById('ui-tangent'),
btnFour = document.getElementById('ui-cosecant'),
btnFive = document.getElementById('ui-secant'),
btnSix= document.getElementById('ui-cotangent');

//question UI UI UI UI UI UI
var numeratorText = document.getElementById('ui-nume');
var denominatorText = document.getElementById('ui-deno');

//EVENTS EVENTS EVENTS
btnOne.addEventListener("click", function(){
    guess(0);}, false);
btnTwo.addEventListener("click", function(){
    guess(1);}, false);
btnThree.addEventListener("click", function(){
    guess(2);}, false);
btnFour.addEventListener("click", function(){
    guess(3);}, false);
btnFive.addEventListener("click", function(){
    guess(4);}, false);
btnSix.addEventListener("click", function(){
    guess(5);}, false);

//GAME INPUT GAME INPUT GAME INPUT
function guess(choice) {
  //console.log('Guessed ' + functionNames[choice]);
  if(choice == correctAnswer) {
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
const fgc = document.getElementById('game-canvas');
const fgctx = fgc.getContext('2d');
resizeCanvas(fgc);
var canvasMidX = fgc.width/2, canvasMidY = fgc.height/2;

//MAIN MAIN MAIN
//draw a new question
newQuestion();



function newQuestion() {
  fgctx.clearRect(0, 0, 600, 600); //CLEAR CLEAR CLEAR
  correctAnswer = Math.floor(Math.random() * Math.floor(6));  //NEW CORRECT ANSWER
  //console.log('The Answer is ' + functionNames[correctAnswer] + ' ' + correctAnswer);
  //Rewrite the quotient
  numeratorText.textContent = functionNume[correctAnswer];
  denominatorText.textContent = functionDeno[correctAnswer];

  //draw the division bar
  drawHand(fgctx, canvasMidX, canvasMidY, canvasMidX - (canvasMidX/8), 0, 7, 'white');
  drawHand(fgctx, canvasMidX, canvasMidY, canvasMidX - (canvasMidX/8), Math.PI, 7, 'white');
}
