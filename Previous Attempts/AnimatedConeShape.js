let qdata;

function preload() {
  qdata = loadStrings("qdata.txt");
}

// let shape;

function setup() {
  createCanvas(innerWidth, innerHeight, WEBGL);
  camera(0, 0, 3000);
  background(0);
  // beginGeometry();
}

function draw() {
  
  orbitControl();
  lights();
  push();
  ambientMaterial(200, 0, 100);
  rotateY(frameCount/10 + 5);
  noStroke();
  let x = 0;
  let y = 1000;
  for (let i = 0; i < qdata.length; i++) {
    let q = qdata[i];
    let siz = 5*parseInt(qdata[i], 2);
    push();
    translate(x, y, 0);
    if (q[2] == "1") {
      rotateZ(siz*2);
    }
    if (q[1] == "1") {
      rotateY(siz);
    }
    box(siz);
    pop();
    y -= siz;
    if (q[0] == "0") {
      x += siz*1.0;
    }
  }
  pop();
  if (frameCount > 80) {
    // shape = endGeometry();
    // background(0);
    // orbitControl();
    // model(shape);
    noLoop();
  }
  
  
}