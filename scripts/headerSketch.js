var canvas;
var xDiv = 40;
var yDiv = 50;
var lsWidth;
var lsHeight;
var lineSegments = [];

function setup(){
  canvas = createCanvas(document.getElementById("p5-header-background").offsetWidth, document.getElementById("p5-header-background").offsetHeight * 2);
  canvas.parent('p5-header-background');
  background(255,255,255,0.3);
  //lsWidth = width/xDiv;
  //lsHeight = height/yDiv;
  lsWidth = 80;
  lsHeight = 7;


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
      col[j] = new lineSegment(direction, i*lsWidth, j*lsHeight-10);
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
    //strokeWeight(map(yPos,0,height/1.3,1,1));
    stroke(25, 228, 255, map(yPos,0,height/1.5,100,0));
    if(moveLeft){
      xOffset = sin(millis()/700 + yPos/yDiv)*lsWidth/2;
    }else{
      xOffset = -sin(millis()/700 + yPos/yDiv)*lsWidth/2;
    }
    if(yPos%12==0){
      //stroke(25, 228, 255,map(yPos,0,height/1.3,200,0));
    }
    beginShape();
    vertex(xPos, yPos);
    vertex(xPos+xOffset+(lsWidth/2), yPos + lsHeight);
    vertex(xPos + lsWidth, yPos);
    endShape();
  }
}

function windowResized(){
  resizeCanvas(document.getElementById("p5-header-background").offsetWidth, document.getElementById("p5-header-background").offsetHeight * 2);
  //lsWidth = width/xDiv;
  //lsHeight = height/yDiv;
  //initialize 2D array of lengths
  ls = [];
  for (var i = 0; i < xDiv; i++) {
    var col = [];
    for (var j = 0; j < yDiv; j++) {
      var direction = false;
      if(i%2==0){
        direction = true;
      }
      col[j] = new lineSegment(direction, i*lsWidth, j*lsHeight-10);
    }
    lineSegments[i] = col;
  }
}
