//    NAME THAT SIDE stuff
//TRIANGLE POINT DATA FOR DEMO AND GAME
var x = 0, y = 0, a = 0, b = 0, d = 0, o = 0,
sideOneLength = 0, sOneMidX = 0, sOneMidY = 0,
sideTwoLength = 0, sTwoMidX = 0, sTwoMidY = 0,
sideThreeLength = 0, sThreeMidX = 0, sThreeMidY = 0;


//HOME HOME HOME
//UNIT CIRCLE Stuff
var ucdc;
var ucdcctx;
if(document.getElementById('cheat-sheet')) {
  //ABOUT US Stuff
  var ac = document.getElementById('about-demo'); //about demo canvas (ucdc)
  var actx = ac.getContext('2d');
  resizeCanvas(ac);
  drawQuestionMark(actx, 5, 'white');
  drawDot(actx, 72, 125, 9, 'white');
}

if(document.getElementById('side-names-demo')) {
  var snc = document.getElementById('side-names-demo'); //side names demo canvas (ucdc)
  var snctx = snc.getContext('2d');
  resizeCanvas(snc);
  newNameThatSide(snc, snctx);
  drawTriangle(snctx, x, y, a, b, d, o, 4.5, 'white');
  drawDot(snctx, (a+x)/2, (b+y)/2, 9, 'black');
  drawDot(snctx, x, y, 9, 'white');
}

if(document.getElementById('functions-demo')) {
  var fc = document.getElementById('functions-demo'); //functions demo canvas (ucdc)
  var fctx = fc.getContext('2d');
  resizeCanvas(fc);
  drawHand(fctx, 72, 72, 60, 0, 4.5, 'white');
  drawHand(fctx, 72, 72, 60, Math.PI, 4.5, 'white');
  fctx.font = "20px Monaco";
  fctx.fillText("Numerator", 20, 60);
  fctx.fillText("Denominator", 7, 100);
}
if(document.getElementById('unit-circle-demo')) {
  //UNIT CIRCLE Stuff
  var ucdc = document.getElementById('unit-circle-demo'); //unit circle demo canvas (ucdc)
  var ucdcctx = ucdc.getContext('2d');
  resizeCanvas(ucdc);

  window.requestAnimationFrame(step);
}
  //find ratios
if(document.getElementById('find-ratios-demo')) {
  var frdc = document.getElementById('find-ratios-demo'); //functions demo canvas (ucdc)
  var frdctx = frdc.getContext('2d');
  resizeCanvas(frdc);

  newNameThatSide(frdc, frdctx);

  drawTriangle(frdctx, x, y, a, b, d, o, 4.5, 'white');
  drawDot(frdctx, x, y, 12, 'white');
  drawDot(frdctx, sOneMidX, sOneMidY, 12, 'black');
  drawDot(frdctx, sTwoMidX, sTwoMidY, 12, 'black');
  drawDot(frdctx, sThreeMidX, sThreeMidY, 12, 'black');
  frdctx.font = '11px monaco';
  frdctx.fillStyle = "white";
  frdctx.textAlign = "center";
  frdctx.textBaseline = "middle";
  frdctx.fillText(Math.floor(sideOneLength), sOneMidX, sOneMidY);
  frdctx.fillText(Math.floor(sideTwoLength), sTwoMidX, sTwoMidY);
  frdctx.fillText(Math.floor(sideThreeLength), sThreeMidX, sThreeMidY);
  frdctx.fillStyle = "black";
}

//sine game
if(document.getElementById('sine-demo')) {
  //ABOUT US Stuff
  var sgc = document.getElementById('sine-demo'); //about demo canvas (ucdc)
  var sgctx = sgc.getContext('2d');
  resizeCanvas(sgc);
}

  // SUBJECT MENU stuff
if(document.getElementById('subject-menu')) {
  var menu = document.getElementById("subject-menu");
}
   //END OF THE TEST TO SEE IF WE"RE ON HOME SCREEN


/*  DRAWING SHORTCUT FUNCTIONS  */
function drawDot(ctx, x, y, radius, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.lineWidth = radius;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}
function drawTriangle(ctx, x, y, a, b, d, o, lineThick, color) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(a, b);
  ctx.lineTo(d, o);
  ctx.closePath();
  // the outline
  ctx.lineWidth = lineThick;
  ctx.strokeStyle = color;
  ctx.stroke();
}
function drawUnitCircle(ctx, x, y, radius, lineThick, color) {
  //do the circle
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineThick;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
}
function drawHand(ctx, x, y, r, angle, lineThick, color) {
  ctx.lineCap = 'round';
  ctx.lineWidth = lineThick;
  ctx.strokeStyle = color;
  ctx.beginPath();
  //draw a vertical line from terminal point to x-axis
  ctx.moveTo(x, y);
  ctx.lineTo(x + (r)*Math.cos(angle), (y) - (r)*Math.sin(angle));
  ctx.strokeStyle = color;
  ctx.stroke();
}
function drawQuestionMark(ctx, lineThick, color) {
  ctx.lineWidth = lineThick;
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(36, 50);
  ctx.bezierCurveTo(36, 0, 108, 0, 108, 50);
  ctx.moveTo(108, 50);
  ctx.bezierCurveTo(108, 90, 72, 70, 72, 108);
  ctx.moveTo(72, 108);
  ctx.lineTo(72, 120);
  ctx.stroke();
}

function resizeCanvas(canvas) {
   var wrc = canvas.clientWidth, hrc = canvas.clientHeight;
   if (canvas.width != wrc || canvas.height != hrc) {
     canvas.width = wrc;
     canvas.height = hrc;
   }
}

/*  PROCEDURAL GENERATION FUNCTIONS */

//NAME THAT SIDE
function generatePoint(offset, max) {
  return ((1 + offset) + Math.floor(Math.random() * Math.floor(max - 2 * offset)));
}
function generateRandomTriangle(offset, canvasWidth) {
  //console.log("generate random triangle");
  x = generatePoint(offset, canvasWidth);
  y = generatePoint(offset, canvasWidth);
  a = generatePoint(offset, canvasWidth);
  b = generatePoint(offset, canvasWidth);
  d = generatePoint(offset, canvasWidth);
  o = generatePoint(offset, canvasWidth);

  sideOneLength = Math.sqrt(Math.pow(a-x, 2) + Math.pow(b-y, 2)),
  sOneMidX = (a+x)/2, sOneMidY = (b+y)/2,
  sideTwoLength = Math.sqrt(Math.pow(d-a, 2) + Math.pow(o-b, 2)),
  sTwoMidX = (a+d)/2, sTwoMidY = (b+o)/2,
  sideThreeLength = Math.sqrt(Math.pow(x-d, 2) + Math.pow(y-o, 2));
  sThreeMidX = (x+d)/2, sThreeMidY = (y+o)/2;
}

/* GAME LOGIC GAME LOGIC GAME LOGIC */

//NAME THAT SIDE NAME THAT SIDE NAME THAT SIDE
function newNameThatSide(c, ctx) {
  //console.log('making triangle');
  //console.log(correctSideName);

  generateRandomTriangle(c.width/10, c.width);
  //Make sure the triangle is large enough
  while(sideOneLength < c.width/2 || sideTwoLength < c.width/2 || sideThreeLength < c.width/2 ||
    (sideTwoLength > sideOneLength && sideTwoLength > sideThreeLength)
    || (Math.abs(sideOneLength - sideThreeLength) < c.width/10))
  {
    generateRandomTriangle(c.width/10, c.width);
  }
  //console.log('side one: ' + sideOneLength + ' side two: ' + sideTwoLength + ' side three: ' + sideThreeLength);
}

/*  ANIMATION   */
var start = null, progress = 0, loopLength = 5000;
function step(timestamp) {
  if (!start) start = timestamp;
  progress = timestamp - start;

  //clear all demo canvas'
  ucdcctx.clearRect(0, 0, 144, 144);
  //draw the unit circle
  drawUnitCircle(ucdcctx, 72, 72, 60, 5, "#FFFFFF");
  drawHand(ucdcctx, 72, 72, 60, 0, 5, 'white');
  drawHand(ucdcctx, 72, 72, 60, Math.PI/2, 5, 'white');
  drawHand(ucdcctx, 72, 72, 60, Math.PI, 5, 'white');
  drawHand(ucdcctx, 72, 72, 60, 3*Math.PI/2, 5, 'white');
  //drawHand
  drawHand(ucdcctx, 72, 72, 60, Math.PI*(2*progress/loopLength), 5, 'white');
  //draw a line for Sine
  ucdcctx.beginPath();
  ucdcctx.strokeStyle = '#c7695b';
  ucdcctx.lineWidth = 7;
  ucdcctx.moveTo(72, 72);
  ucdcctx.lineTo(72, 72-62*Math.sin(2*Math.PI*(progress/loopLength)));
  ucdcctx.stroke();
  //draw a line for Cosine
  ucdcctx.beginPath();
  ucdcctx.strokeStyle = 'blue';
  ucdcctx.lineWidth = 6;
  ucdcctx.moveTo(72, 72);
  ucdcctx.lineTo(72+62*Math.cos(2*Math.PI*(progress/loopLength)), 72);
  ucdcctx.stroke();

  //Draw dot at the x/y value
  //drawDot(ucdcctx, 132, 72, 9, 'black');
  //drawDot(ucdcctx, 72+60*Math.cos(Math.PI*(progress/2000)), 72-60*Math.sin(Math.PI*(progress/2000)), 9, 'black');
  drawDot(ucdcctx, 72, 72, 9, 'black');
  /*draw arc
  ucdcctx.beginPath();
  ucdcctx.strokeStyle = 'black';
  ucdcctx.lineWidth = 1;
  ucdcctx.arc(72, 72, 60, Math.PI * 2 -Math.PI*(progress/2000), 0);
  ucdcctx.stroke();//*/
  //draw hand

  //draw SINE SINE Sine
  let steps = 64, stepSize = sgc.clientWidth/steps, wavePad = 0, waveBounds = sgc.clientWidth,
   originY = sgc.clientWidth/2;
  sgctx.clearRect(0, 0, 144, 144);
  sgctx.beginPath();
  sgctx.lineCap = 'round';
  sgctx.strokeStyle = 'white';
  sgctx.lineWidth = 7;
  sgctx.beginPath();

  for(i=steps/16; i<=steps-steps/16; i++) {
    sgctx.lineTo(i*stepSize,
    originY - (originY/2)*Math.sin((Math.PI)*(i*stepSize)/(waveBounds) + (2*Math.PI)*(progress/loopLength)));
  }
  sgctx.stroke();

  if (progress < loopLength) {
    window.requestAnimationFrame(step);
    //console.log(progress);
  }
  else {
    progress = 0;
    window.requestAnimationFrame(step);
    //console.log(progress + ' reset');
    start = null;
  }
}
