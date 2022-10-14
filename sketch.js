function preload() {
	// put preload code here
}

let yoff= 0.0;
let moving = 0;


function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(51);
	moving += 1;

	beginShape();
	fill(255, 0, 0, 50);
	
  
	let xoff = 0; 
  
	// Iterate over horizontal pixels
	for (let x = 0; x <= width; x += 5) {
	  let y = map(noise(xoff, yoff), 0, 0.2, 20*!moving, moving);
	  vertex(x, y);
	  xoff += 0.02;
	}
	yoff += 0.01;
	vertex(width, height);
	vertex(0, height);
	endShape();
}

