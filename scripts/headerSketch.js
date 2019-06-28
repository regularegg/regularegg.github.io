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

  var isHit = false;
  var twangFactor = 0;
  var xOffset = 0;


  this.twang = function(){
    twangFactor -= 0.2;
    stroke(lerpColor(color(25, 228, 255,map(yPos,0,height/1.5,100,0)), color(255, 232, 25,map(yPos,0,height/1.5,100,0)),map(abs(twangFactor),0,10,0,1)));
    if(twangFactor<0){
      isHit = false;
    }
  }

  this.drawLine = function(){
    stroke(25, 228, 255, map(yPos,0,height/1.5,100,0)*(twangFactor+1));

    if(moveLeft){
      xOffset = sin(millis()/700 + yPos/yDiv)*lsWidth/2;
    }else{
      xOffset = -sin(millis()/700 + yPos/yDiv)*lsWidth/2;
    }
//sqrt(sq(mouseX-xPos/2)) < 5 && sqrt(sq(mouseY-yPos/2)) < 2
    if(dist(mouseX,mouseY, xPos + lsWidth/2,yPos + lsHeight/2) < 20){
      isHit = true;
      var mouseVect = createVector(mouseX - xPos+(lsWidth/2),mouseY - yPos + (lsWidth/2));
      twangFactor = mouseVect.heading() * dist(mouseX, mouseY, xPos+(lsWidth/2), yPos);
    }

    if(isHit){
      this.twang();
    }
    //strokeWeight(abs(twangFactor)/4 + 1);
    beginShape();
    vertex(xPos, yPos);
    vertex(xPos+xOffset+(lsWidth/2), yPos + lsHeight + (twangFactor*sin(millis()/100)));
    vertex(xPos + lsWidth, yPos);
    endShape();
  }
}

function windowResized(){
  resizeCanvas(document.getElementById("p5-header-background").offsetWidth, document.getElementById("p5-header-background").offsetHeight * 2);

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
