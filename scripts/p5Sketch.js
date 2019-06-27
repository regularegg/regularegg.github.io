var canvas
var pwidth, pheight;

function setup() {
  pwidth = document.getElementById("p5-header").offsetWidth;
  pheight = document.getElementById("p5-header").offsetHeight;
  canvas = createCanvas(90, 90);
  canvas.parent('p5-header');
}

function draw() {
  background(255);

  translate(width/2,height/2);
  fill(0);
  ellipse(10,50, map(sin(millis()/900),-1,1,0.5,1) * 40,map(sin(millis()/900),-1,1,0.5,1) * 10);

  drawM();
}

function drawM(){
  //draw an M shape
  push();
  translate(0,sin(millis()/900) * 15);
  fill(230,150,60);
  noStroke();
  beginShape();
  vertex(-10,-10); //Top left corner
  vertex(0,-10);
  vertex(10,10); //center dip
  vertex(20,-10);
  vertex(30,-10); //top right corner
  vertex(30,30);
  vertex(20,30);
  vertex(20,15);//right armpit
  vertex(10,30);//center dip bottom
  vertex(0,15);//left armpit
  vertex(0,30);
  vertex(-10,30);//bottom left corner
  vertex(-10,-10);
  endShape();
  translate(3,3);
  fill(255,240,50);
  beginShape();
  vertex(-10,-10); //Top left corner
  vertex(0,-10);
  vertex(10,10); //center dip
  vertex(20,-10);
  vertex(30,-10); //top right corner
  vertex(30,30);
  vertex(20,30);
  vertex(20,15);//right armpit
  vertex(10,30);//center dip bottom
  vertex(0,15);//left armpit
  vertex(0,30);
  vertex(-10,30);//bottom left corner
  vertex(-10,-10);
  endShape();
  pop();
}
