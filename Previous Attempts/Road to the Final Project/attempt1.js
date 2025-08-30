// The number of times the circuit was run
const SHOTS = 1000;
let qdata;

const invalidOutputs = ['0010', '0110', '1010', '1110'];

// copied output from Qiskit
let probabilities = {
  '0000': 0.1249999999999999, 
  '0001': 0.06249999999999996, 
  '0010': 1.3217493523837122e-34, 
  '0011': 0.06249999999999996, 
  '0100': 0.12499999999999994, 
  '0101': 0.06249999999999996, 
  '0110': 1.1338816837666706e-35, 
  '0111': 0.06249999999999996, 
  '1000': 0.1249999999999999, 
  '1001': 0.06249999999999996, 
  '1010': 1.3217493523837122e-34, 
  '1011': 0.06249999999999996, 
  '1100': 0.12499999999999994, 
  '1101': 0.06249999999999996, 
  '1110': 1.1338816837666706e-35, 
  '1111': 0.06249999999999996
};

let colorRules;
let img;

function preload() {
  qdata = loadStrings('quantum_data1.txt');
}

function setup() {
  
  createCanvas(innerWidth, innerHeight, WEBGL);
  angleMode(DEGREES);
  
  camera(500, 0, 500);
  
  
  colorRules = {
    '0000': color(3, 38, 8), 
    '0001': color(50, 0, 100), 
    '0011': color(100, 0, 100), 
    '0100': color(100, 0, 100), 
    '0101': color(100, 0, 100), 
    '0111': color(100, 0, 100), 
    '1000': color(20, 2, 100), 
    '1001': color(90), 
    '1011': color(80), 
    '1100': color(55), 
    '1101': color(50), 
    '1111': color(255) 
  };
  
}

function draw() {
  
  randomSeed(1);
  
  background(0);
  
  orbitControl();
  // lights();
  

  for (let i = 0; i < qdata.length; i++) {
    
    let q = qdata[i];
    let b = parseInt(q, 2);
    let isError = invalidOutputs.includes(q);
    let p = probabilities[q];
    
    // star
    push();
    
    noStroke();
    fill(255, 20 + b*5);
    
    // random point in sphere
    
    let rho = random(500);
    let phi = random(180);
    let theta = random(360);
    
    let x = rho * sin(phi) * cos(theta); 
    let y = rho * cos(phi) + 200;
    let z = rho * sin(phi) * sin(theta);
      
    translate(x, y, z);
    sphere((b + 1)*0.2);
    
    pop();
    
    // building
    push();
    
    // length of the sides of the box
    let s;
    if (isError) {
      fill(255, 100, 150, 150);
      s = 10;
    } else {
      // fill(b * 25 + 100, 100);
      fill(colorRules[q]);
      s = 5;
    }
    noStroke();
    
    let rad = 40 + i*0.4;
    let ang = i*137.508;
    
    let h = 4 + p*500; // height of the box
    
    translate(rad * cos(ang), i*0.2 - h/2, rad * sin(ang));
    
    // draw the box
    box(s, h, s);
    
    pop();
  }
  
    
}