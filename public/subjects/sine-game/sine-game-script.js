//UI UI UI
var formula = document.getElementById("formula"),
amplitude = document.getElementById("amplitude"),
period = document.getElementById("period"),
deg = document.getElementById("degree"),
uiY = document.getElementById("y"),
playToggle = document.getElementById("ui-play");

/*
EVENTS EVENTS EVENTS
btnOne.addEventListener("click", function(){
    guess(0);}, false);
btnTwo.addEventListener("click", function(){
    guess(1);}, false);
btnThree.addEventListener("click", function(){
    guess(2);}, false);*/
playToggle.addEventListener("click", function(){
  if(playing) {
    playing = false;
    //console.log('start at stop ' + start);
    playToggle.textContent = 'Play';
  }
  else {
    playing = true;
    start = null;
      //console.log('start at start ' + start);
    playToggle.textContent = 'Stop';
  }
  window.requestAnimationFrame(step);
});

window.addEventListener('resize', function() {
  resizeCanvas(canvas);
  steps = 12;
  stepSize = canvas.clientWidth/steps;
  originX = canvas.clientWidth/2;
  originY = canvas.clientHeight/2;
  wavePad = canvas.clientWidth/16;
  waveBounds = canvas.clientWidth/2 - 2*wavePad;
});

//CANVAS CANVAS CANVAS
var canvas = document.getElementById('sine-game-canvas');
var ctx = canvas.getContext('2d');
resizeCanvas(canvas);
var steps = 12, stepSize = canvas.clientWidth/steps;
var originX = canvas.clientWidth/2;
var originY = canvas.clientHeight/2;

var wavePad = canvas.clientWidth/16, waveBounds = canvas.clientWidth/2 - 2*wavePad, realPeriod = 2, realDeg = 0, realY = 0;
var midPoint = 100;
var r = midPoint;

var x = -originX/2;

/*  ANIMATION   */
window.requestAnimationFrame(step);

var playing = true, start = null, restart = false, pauseStamp = null, progress = 0, loopLength = 8000;
function step(timestamp) {
  if (!start) {
    //console.log(timestamp);
    start = timestamp; //set start if it is not yet
  }
  pauseStamp = timestamp; //so we know when we paused
  if(restart) {
    start -= timestamp - pauseStamp;
    restart = false;
  }
  progress = timestamp - start;
  //console.log(timestamp);
if(playing) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    //UNIT CIRCLE
    drawUnitCircle(ctx, canvas.clientWidth/4, canvas.clientHeight/2, 2*canvas.clientHeight/8, 9, 'white');
    //SINE WAVE
    ctx.lineCap = 'round';
    steps = 100;
    stepSize = waveBounds/steps;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;
    ctx.moveTo(wavePad*3, originY);
    ctx.beginPath();
    for(i=0; i<=steps; i++) {
      ctx.lineTo(i*stepSize+wavePad*6+(2*canvas.clientHeight/8),
      originY - (originY/2)*Math.sin((realPeriod*Math.PI)*(i*stepSize)/(waveBounds) + (Math.PI + 2*Math.PI-2*Math.PI*progress/loopLength)));
      /*ctx.lineTo(i*stepSize+wavePad+(2*canvas.clientHeight/8)+((2*canvas.clientHeight/8)*Math.cos(Math.PI*(2*progress/loopLength))),
      originY - (originY/2)*Math.sin((realPeriod*Math.PI)*(i*stepSize)/(waveBounds) + (2*Math.PI)*(progress/loopLength)));*/
    }
    ctx.stroke();

    //line to connect rotation and oscillation
    ctx.beginPath();
    ctx.setLineDash([0, canvas.clientWidth/16-(canvas.clientWidth/32*Math.cos(Math.PI*(2*progress/loopLength)))]);
    ctx.moveTo(2*wavePad+(2*canvas.clientHeight/8)+((2*canvas.clientHeight/8)*Math.cos(Math.PI*(2*progress/loopLength))),
    wavePad+(3*canvas.clientWidth/16)+((2*canvas.clientHeight/8)*-Math.sin(Math.PI*(2*progress/loopLength))));
    ctx.lineTo(canvas.clientWidth/2, wavePad+(3*canvas.clientWidth/16)+((2*canvas.clientHeight/8)*-Math.sin(Math.PI*(2*progress/loopLength))));
    ctx.stroke();
    ctx.setLineDash([]);
    //midline
    ctx.lineWidth = 4.5
    ctx.beginPath();
    ctx.moveTo(canvas.clientWidth/2, 3*canvas.clientHeight/4);
    ctx.lineTo(canvas.clientWidth/2, canvas.clientHeight/4);
    ctx.stroke();
    //draw arm for rotation
    drawHand(ctx, canvas.clientWidth/4, canvas.clientHeight/2, 2*canvas.clientHeight/8,
      (Math.PI*2*(progress/loopLength)), 4.5, 'white');
    //cosine indicator
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(2*wavePad+(2*canvas.clientHeight/8)+((2*canvas.clientHeight/8)*Math.cos(Math.PI*(2*progress/loopLength))),
    canvas.clientHeight/2);
    ctx.lineTo(2*wavePad+(2*canvas.clientHeight/8),
    wavePad+(3*canvas.clientWidth/16));
    ctx.stroke();
    //sine indicator
    ctx.strokeStyle = '#c7695b';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(2*wavePad+(2*canvas.clientHeight/8)+((2*canvas.clientHeight/8)*Math.cos(Math.PI*(2*progress/loopLength))),
    canvas.clientHeight/2);
    ctx.lineTo(2*wavePad+(2*canvas.clientHeight/8)+((2*canvas.clientHeight/8)*Math.cos(Math.PI*(2*progress/loopLength))),
    wavePad+(3*canvas.clientWidth/16)+((2*canvas.clientHeight/8)*-Math.sin(Math.PI*(2*progress/loopLength))));
    ctx.stroke();
    //dot for the circle
    drawDot(ctx, 2*wavePad+(2*canvas.clientHeight/8)+((2*canvas.clientHeight/8)*Math.cos(Math.PI*(2*progress/loopLength))),
    wavePad+(3*canvas.clientWidth/16)+((2*canvas.clientHeight/8)*-Math.sin(Math.PI*(2*progress/loopLength))), 16, 'black');
    //dot for the midline
    drawDot(ctx, canvas.clientWidth/2, wavePad+(3*canvas.clientWidth/16)+((2*canvas.clientHeight/8)*-Math.sin(Math.PI*(2*progress/loopLength))), 16, 'black');
    //tail dot
    //drawDot(ctx, canvas.clientWidth - wavePad*2, wavePad+(3*canvas.clientWidth/16)+((2*canvas.clientHeight/8)*-Math.sin(Math.PI*(2*progress/loopLength))), 16, 'white');

    //draw the y values
    ctx.font = "12px Monaco";
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    realY = (Math.sin((progress/loopLength)*2*Math.PI).toFixed(1).toString());
    ctx.fillText(realY,
    canvas.clientWidth/2, wavePad+(3*canvas.clientWidth/16)+((2*canvas.clientHeight/8)*-Math.sin(Math.PI*(2*progress/loopLength)))+4.5);
    //draw degree value on circle dot
    realDeg = Math.floor(360*(progress/loopLength)).toString();
    ctx.fillText(realDeg,
    2*wavePad+(2*canvas.clientHeight/8)+((2*canvas.clientHeight/8)*Math.cos(Math.PI*(2*progress/loopLength))),
    wavePad+(3*canvas.clientWidth/16)+((2*canvas.clientHeight/8)*-Math.sin(Math.PI*(2*progress/loopLength)))+4.5);

    //UI UI UI UI UI UI
    period.textContent = ('Period = ' + realPeriod.toString() + 'Pi/b');
    if(realDeg<10) {
      deg.innerHTML = ('Degree = &nbsp;&nbsp;' + realDeg);
      formula.innerHTML = ('sin(&nbsp;&nbsp;' + realDeg + ') = &nbsp;' + realY);
    }
    else if(realDeg < 100) {
      deg.innerHTML = ('Degree = &nbsp;' + realDeg);
      formula.innerHTML = ('sin(&nbsp;' + realDeg + ') = &nbsp;' + realY);
    }
    else {
      deg.innerHTML = ('Degree = ' + realDeg);
      if(realY > 0) {
        formula.innerHTML = ('sin(' + realDeg + ') = &nbsp;' + realY);
      }
      else if(realY == 0) {
        formula.innerHTML = ('sin(' + realDeg + ') = &nbsp;0.0');
      }
      else {
        formula.innerHTML = ('sin(' + realDeg + ') = ' + realY);
      }
    }
    //update Y Y Y
    if(realY > 0) {
      uiY.innerHTML = ('y = &nbsp;' + realY);
    }
    else if(realY == 0) {
      uiY.innerHTML = ('y = &nbsp;0.0');
    }
    else {
      uiY.innerHTML = ('y = ' + realY);
    }
    //console.log('start ' + start + ' progress ' + progress);

    //HALF-CHORD  HALF-CHORD  HALF-CHORD
    hcW = hcc.clientWidth/2;
    resizeCanvas(hcc);
    hcctx.clearRect(0, 0, hcW*2, hcW*2);

    //draw x and y axis
    hcctx.lineWidth = 2;
    hcctx.strokeStyle = 'black';
    hcctx.beginPath();
    hcctx.moveTo(hcW/4, hcW);
    hcctx.lineTo(hcW+3*hcW*Math.cos(Math.PI/4)/4, hcW);
    hcctx.stroke();
    hcctx.beginPath();
    hcctx.moveTo(hcW+3*hcW*Math.cos(Math.PI/4)/4, hcW);
    hcctx.lineTo(hcW*1.75, hcW);
    hcctx.setLineDash([2, 8]);
    hcctx.stroke();
    hcctx.setLineDash([]);
    hcctx.beginPath();
    hcctx.moveTo(hcW, hcW/4);
    hcctx.lineTo(hcW, hcW*1.75);
    hcctx.stroke();

    drawUnitCircle(hcctx, hcW, hcW, 3*hcW/4, 3, 'black');

    //(ctx, x, y, a, b, d, o, lineThick, color) { STRING STRING STRING CHORD
    hcctx.strokeStyle = 'white';
    hcctx.setLineDash([2, 8]);
    hcctx.beginPath();
    hcctx.moveTo(hcW, hcW);
    hcctx.lineTo(hcW+3*hcW*Math.cos(Math.PI/4)/4, hcW - 3*hcW*Math.cos(Math.PI/4)/4);
    hcctx.stroke();
    hcctx.beginPath();
    hcctx.moveTo(hcW, hcW);
    hcctx.lineTo(hcW+3*hcW*Math.cos(Math.PI/4)/4, hcW + 3*hcW*Math.cos(Math.PI/4)/4);
    hcctx.stroke();
    hcctx.setLineDash([]);
    //draw STRING
    hcctx.lineWidth = 7;
    hcctx.beginPath();
    hcctx.moveTo(hcW+3*hcW*Math.cos(Math.PI/4)/4, hcW - 3*hcW*Math.cos(Math.PI/4)/4);
    hcctx.lineTo(hcW+3*hcW*Math.cos(Math.PI/4)/4, hcW + 3*hcW*Math.cos(Math.PI/4)/4);
    hcctx.stroke();
    //draw the bow x, y, r, s, e
    hcctx.beginPath();
    hcctx.lineCap = 'round';
    hcctx.strokeStyle = '#845E43';
    hcctx.lineWidth = 12;
    hcctx.arc(hcW, hcW, 3*hcW/4, -Math.PI/4, Math.PI/4);
    hcctx.stroke();


  }
  if(progress < loopLength) {
    window.requestAnimationFrame(step);
  }
  else {
    progress = 0;
    window.requestAnimationFrame(step);
    //console.log('reset');
    start = timestamp;
  }
}
//half chord demo
var hcc = document.getElementById('half-chord-canvas');
var hcctx = hcc.getContext('2d');
resizeCanvas(hcc);
hcW = hcc.clientWidth;
