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
  
  for (let i=0; i<width*2; i++) {
    let loc = createVector(random(width*1.2), random(height), random(1,7));
    let angle = 0; //any value to initialize
    let dir = createVector(cos(angle), sin(angle));
    let speed = random(0.5,2);
    
     particles[i]= new Particle(loc, dir, speed);
    //particles.push(new Particle(loc, dir, speed));
  }
}

function draw() {
  background(0, 10);

  push();
  textSize(10);
  fill("white");
  let myText = "move to change direction, click to change color"
  text(myText, width/2, height/7, 100, 80);
  pop();
   
  for (let i=0; i<particles.length; i++) {
    particles[i].run();
  }
}

class Particle {
  constructor(loc, dir, speed) {
    this.loc = loc;
    this.dir = dir;
    this.speed = speed;
  	// var col;
  }
  run() {
    this.move();
    this.checkEdges();
    this.update();
  }
  move(){
    let angle = noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount/noiseScale)* 360 * noiseSmoothness;
    this.dir.x = cos(angle)* map(mouseX, 0, width, -3, 4);
    this.dir.y = sin(angle) * map(mouseY, 0, width, -3, 4);
    
    let vel = this.dir;
    
    //let d = 1;  //direction change 
   
    vel * this.speed; //*d
    //console.log(d);
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
    //MOVE TO CHANGE COLOR
    //let firstColor = color(255, map(mouseX, 0, width, 0, 255), map(mouseY, 0, width, 0, 255));
    //  let firstColorR = noise(0,255);
    //  let firstColorG = noise(0,255);
    //  let firstColorB = noise(0,255);
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
   console.log("wheel to change color");
     let myColor = color(random(255), random(255), random(255))
     fill(myColor);
 }