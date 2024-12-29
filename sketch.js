// These true/false values control which parts of the artwork are being drawn
// When drawBackground is false: As the user rotates, zooms, and moves around the camera, the frames are drawn on top of each other. The artwork is then a result of the user interacting with the structure--can be thought of as a metaphor for measurement, since the act of observing a qubit changes its state.
const CONTROLS = {
  drawBackground: true, // Whether to draw the background each frame
  drawShell1: true, // Whether to draw the first shell
  drawShell2: true, // Whether to draw the second shell
  drawStars: true // Whether to draw the stars
};

// Number of times the circuit was run per experiment/job
const SHOTS = 1000;

// List of outputs that should theoretically not occur when running this quantum circuit (but can occur due to noise)
const ERROR_VALUES = ['0010', '0110', '1010', '1110'];

// This object stores each output's theoretical probability from 0 to 1 for the circuit, copied from Qiskit
const PROBABILITIES = {
  '0000': 0.125,
  '0001': 0.0625,
  '0010': 0,
  '0011': 0.0625,
  '0100': 0.125,
  '0101': 0.0625,
  '0110': 0,
  '0111': 0.0625,
  '1000': 0.125,
  '1001': 0.0625,
  '1010': 0,
  '1011': 0.0625,
  '1100': 0.125,
  '1101': 0.0625,
  '1110': 0,
  '1111': 0.0625
};

// These arrays will contain the list of measurements from each experiment/job
// Each array has 1000 binary numbers
let qdata1;
let qdata2;

// This code runs before the setup function
function preload() {
  // Load the data from the text files
  qdata1 = loadStrings('qdata1.txt'); // First run
  qdata2 = loadStrings('qdata2.txt'); // Second run
}

// Initialization: this code runs once at the start of the program
function setup() {

  // Create a blank canvas, set its size, and enable 3D shapes and coordinate system (WEBGL rendering mode)
  // Positive x-axis points to the right
  // Positive y-axis points down
  // Positive z-axis points out of the screen
  createCanvas(innerWidth, innerHeight, WEBGL);
  
  // Set the angle mode to DEGREES (default is RADIANS)
  angleMode(DEGREES);
  
  // Set camera position (x, y, and z) in 3D space
  camera(0, 0, 2500);
  
  // Draw a black background
  background(0);

}

// This code runs every frame
function draw() {
  
  // (For pseudorandom number generation)
  // Set seed so that the same pseudorandom numbers are generated each frame
  randomSeed(42);
  
  // Draw a black background if the condition is true
  if (CONTROLS.drawBackground) {
    background(0);
  }
    
  // Allow the user to rotate, zoom, and move the camera around
  orbitControl();
  
  // Remove default outline around shapes
  noStroke(); 
  
  // Draw the entire 3D structure
  drawStructure();
  
}

function keyPressed() {
  if (key == "s") {
    saveCanvas();
  }
}