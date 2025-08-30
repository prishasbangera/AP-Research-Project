

let qdata;

function preload() {
  qdata = loadStrings("qdata.txt");
}

function setup() {
  createCanvas(innerWidth, innerHeight, WEBGL);
  noStroke();
}

function draw() {
  
  orbitControl();
  background(0);
  lights();
  
  // normalMaterial();
  translate(-150, 0, 0);
  for (let i = 0; i < qdata.length; i++) {
    translate(3, 0, 0);
    box(3, 10*parseInt(qdata[i], 2), 30);
  }
  
  /*
  noStroke();
  
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let q = qdata[(x + y*10)];
      fill(parseInt(q[0]+q[2], 2) * 10 + 100, parseInt(q[1],2) * 70 + 60, q[2] * 70 + 100, 190);
      rect(x * width/10, y * height/10, width/10, height/10);
    }
  }
  */
  
}