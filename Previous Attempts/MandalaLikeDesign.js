// The number of times the circuit was run
const SHOTS = 1000;
let qData;
let simData;

const invalidOutputs = ['0010', '0110', '1010', '1110'];

function preload() {
  simData = loadStrings("simulator_data.txt");
  qData = loadStrings("quantum_data.txt");
}

function setup() {
  
  createCanvas(innerWidth, innerHeight);
  
  background(0);
  angleMode(DEGREES);
  
  translate(width/2, height/2);
  scale(0.5);
  
  for (let n = 0; n < SHOTS; n++) {
    
    // get nth output
    let q = qData[n];
    let d = parseInt(q, 2);
    let s = simData[n]; 
    let sd = parseInt(s, 2);
    
    push();
    
    let ang = map(n, 0, SHOTS, 0, 360);
    let op  = 255 - d*10;
    
    rotate(ang);
    translate(2*height/(d+2) + sd, 0);
    rotate(ang*2);
    
    if (invalidOutputs.find(i => i == q)) {
      fill(200, 100, 0, op);
    } else {
      fill(d * 10, sd * 10, 255, op);    
    }
    noStroke();
    ellipse(0, 0, 100, d+4);
    
    pop();
    
    
  }
  
}



