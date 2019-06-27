var canvas;
var xDiv = 40;
var yDiv = 30;
var lsWidth;
var lsHeight;
var lineSegments = [];

function setup(){
  canvas = createCanvas(document.getElementById("p5-header-background").offsetWidth, document.getElementById("p5-header-background").offsetHeight * 1.75);
  canvas.parent('p5-header-background');
  background(255,255,255,0.3);
  lsWidth = width/xDiv;
  lsHeight = height/yDiv;

  noFill();
  strokeWeight(1);
  //initialize 2D array of lengths
  for (var i = 0; i < xDiv; i++) {
    var col = [];
    for (var j = 0; j < yDiv; j++) {
      var direction = false;
      if(i%2==0){
        direction = true;
      }
      col[j] = new lineSegment(direction, i*lsWidth, j*lsHeight);
    }
    lineSegments[i] = col;
  }
}

function draw(){
  background(255);
  for (var i = 0; i < xDiv; i++) {
    for (var j = 0; j < yDiv; j++) {
      lineSegments[i][j].drawLine();
    }
  }
}

function lineSegment(moveLeft, xPos, yPos){
  this.moveLeft = moveLeft;
  this.xPos = xPos;
  this.yPos = yPos;

  var xOffset = 0;

  this.drawLine = function(){

    stroke(map(yPos,0,height,220,255));
    if(moveLeft){
      xOffset = sin(millis()/300 + yPos/yDiv)*lsWidth/2;
    }else{
      xOffset = -sin(millis()/300 + yPos/yDiv)*lsWidth/2;
    }

    beginShape();
    vertex(xPos, yPos);
    vertex(xPos+xOffset+(lsWidth/2), yPos + lsHeight);
    vertex(xPos + lsWidth, yPos);
    endShape();
  }
}
