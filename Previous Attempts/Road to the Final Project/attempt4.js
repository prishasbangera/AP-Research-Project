const SHOTS = 1000;

let qdata1, qdata2;

const invalidOutputs = ['0010', '0110', '1010', '1110'];

// copied output from Qiskit
let probabilities = {
  '0000': 0.1249999999999999, 
  '0001': 0.06249999999999996, 
  '0010': 1.3217493523837122e-34, // invalid output
  '0011': 0.06249999999999996, 
  '0100': 0.12499999999999994, 
  '0101': 0.06249999999999996, 
  '0110': 1.1338816837666706e-35, // invalid output
  '0111': 0.06249999999999996, 
  '1000': 0.1249999999999999, 
  '1001': 0.06249999999999996, 
  '1010': 1.3217493523837122e-34, // invalid output
  '1011': 0.06249999999999996, 
  '1100': 0.12499999999999994, 
  '1101': 0.06249999999999996, 
  '1110': 1.1338816837666706e-35, // invalid output
  '1111': 0.06249999999999996
};

let colorRules;
let img;

function preload() {
  qdata1 = loadStrings('quantum_data1.txt');
  qdata2 = loadStrings('quantum_data2.txt');
}

function setup() {
  
  createCanvas(innerWidth, innerHeight, WEBGL);
  angleMode(DEGREES);
  
  camera(0, 0, 2500);
  
  
  colorRules = {
    '0000': color(6, 79, 38), 
    '0001': color(20, 133, 106), 
    '0011': color(7, 93, 102), 
    '0100': color(7, 90, 122), 
    '0101': color(5, 68, 163), 
    '0111': color(18, 35, 166), 
    '1000': color(15, 9, 92), 
    '1001': color(39, 23, 117), 
    '1011': color(38, 5, 89), 
    '1100': color(40, 18, 66), 
    '1101': color(40, 18, 66), 
    '1111': color(255) 
  };
  
}

function drawBuilding(i, q, s, a) {

  let b = parseInt(q, 2);
    let isError = invalidOutputs.includes(q);
    let p = probabilities[q];

  // building
    push();
    
    // length of the sides of the box
    let clr;
    
    if (isError) {
      clr = color(255, 50, 100, 150);
      s = 10;
    } else {
      clr = colorRules[q];
      clr.setAlpha(a);
      // s = 5;
    }
    noStroke();

  fill(clr);
    
    let rad = 40 + i*0.4;
    let ang = i*137.508;// + frameCount;
    
    let h = 4 + p*1000; // height of the box
    y = i*0.2 - h/2;
  
    rotate(ang)
    translate(rad, 0, 0);
    
    // draw the box
    box(s, h, s);
    
    pop();
  
}

function draw() {
  
  randomSeed(1234);
  
  background(0);
  
  orbitControl();
  // lights();
  

  for (let i = 0; i < SHOTS; i++) {
    
    let q1 = qdata1[i];
    let q2 = qdata2[i];
  
    
    push();
    rotateZ(45);
    push();
    translate(0, -700, 0);


    drawBuilding(i, q1, 7, 200);
    pop();
    push();
    
    translate(0, 700, 0);

        scale(1, -1, 1)

    drawBuilding(i, q2, 8, 100);
    pop();
    
    // star
    /*
    push();
    
    let b1 = parseInt(q1, 2);
    let b2 = parseInt(q2, 2);
    let b = abs(b1 - b2);
    
    noStroke();
    
    // random point in sphere
    
//     let rho = randomGaussian(300, 100);
//     let phi = random(180);
//     let theta = random(360);
      
//     let x = rho * sin(phi) * cos(theta); 
//     let y = rho * cos(phi);
//     let z = rho * sin(phi) * sin(theta);
    
    let rad = randomGaussian(50, 100);
    let theta = random(360);
    let x = rad * cos(theta);
    let y = random(1200) - 600;
    let z = rad * sin(theta);

    translate(x,y,z);
    fill(255, 60 + b*10);
    let s = b * 0.2 + 1;
    sphere(s * 0.5);
    
    fill(100 + b1*20, b2 * 100 + 50, 200 + b2*10, 80)
    sphere(s * 1.1);
    translate(x, -y+1000, z);
    
    pop();
    

    
  
  */
          pop();

  }
  // noLoop();
}