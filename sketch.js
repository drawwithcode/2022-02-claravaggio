function preload() {
}

let noiseScale = 500; 
let noiseSmoothness = 2;
let particles = [];
let c1, c2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noStroke();
  
  for (let i=0; i < width; i++) {
    let loc = createVector(random(width * 1.2), random(height), random(1,7));
    let angle = 0;
    let dir = createVector(cos(angle), sin(angle));
    let speed = random(0.5,2);

     particles[i]= new Particle(loc, dir, speed);
  }
}

function draw() {
  background(0, 10);

  for (let i = 0; i < particles.length; i++) {
    particles[i].run();
  }
  push();
  textSize(17);
  textFont("Signika Negative");
  textAlign(CENTER);
  textStyle(ITALIC);
  fill("white");
  let myText = "Move to change direction, click to change color";
  text(myText, width/2 - 100, height/7 * 6, 200, 200);
  pop();
}

class Particle {
  constructor(loc, dir, speed) {
    this.loc = loc;
    this.dir = dir;
    this.speed = speed;
  }
  run() {
    this.move();
    this.checkEdges();
    this.update();
  }
  move(){
    //set the position of the ellipses
    let angle = noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount/noiseScale)* 360 * noiseSmoothness;
    this.dir.x = cos(angle)* map(mouseX, 0, width, -3, 4);
    this.dir.y = sin(angle) * map(mouseY, 0, width, -3, 4);
    
    let vel = this.dir;

    vel * this.speed;
    this.loc.add(vel);
  }
  checkEdges(){
    // relocate objects when they arrive outside of canva
    if (this.loc.x<0 || this.loc.x>width || this.loc.y<0 || this.loc.y>height) {    
      this.loc.x = random(width*1.2);
      this.loc.y = random(height);
    }
  }
  update(){
    //IF YOU WANT TO MOVE TO CHANGE COLOR
    //let firstColor = color(255, map(mouseX, 0, width, 0, 255), map(mouseY, 0, width, 0, 255));
    //  //let firstColorB = color(map(mouseX, 0, width, 0, 255));
    //  let firstColor = color(firstColorR, firstColorB, firstColorG);
    // let secondColor = color(map(mouseY, 0, height, 0, 255));
    // let inter = map(this.loc.y, 0, height, 0, 1);
    // let c = lerpColor(firstColor, secondColor, inter);
    // fill(c);
    ellipse(this.loc.x, this.loc.y, this.loc.z);
  }
  
}
 function mouseClicked()  {
     let myColor = color(random(255), random(255), random(255))
     fill(myColor);
 }