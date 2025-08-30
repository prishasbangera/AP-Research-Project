// The number of times the circuit was run
const SHOTS = 1000;
let qData;
// let simData;
let particles;
let img;

const invalidOutputs = ['0010', '0110', '1010', '1110'];

function preload() {
  
  // simData = loadStrings("simulator_data.txt");
  qData = loadStrings("quantum_data.txt");
  img = loadImage("img.png");
}

function setup() {
  
  createCanvas(innerWidth, innerHeight);
  
  background(0);
  angleMode(DEGREES);
  
  translate(width/2, height/2);
  
  // create a new particle system using quantum data
  particles = new ParticleSystem(qData, invalidOutputs);
  
}

function draw() {
  
  particles.run();
  // print(particles.particles[0]);
  
}

function mouseDragged() {
  particles.addParticle(mouseX - width/2, mouseY-height/2);
}



