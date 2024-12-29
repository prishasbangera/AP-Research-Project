// Draw the entire 3D structure 
function drawStructure() {

  // Loop through all the measurements
  // n is the index that goes from 0 to SHOTS-1
  // For each iteration of the loop, 1 box is drawn according to the (n+1)th number from qdata1, 1 box is drawn according to (n+1)th output from qdata2, and 1 star is drawn according to both
  for (let n = 0; n < SHOTS; n++) {
    
    // Get the (n+1)th measurement from the first job
    // For instance, qdata1[0] retrieves the first binary number from the first list of outputs
    let q1 = qdata1[n];
    // Get the (n+1)th measurement from the second job
    let q2 = qdata2[n];
    
    // DRAW THE (n+1)TH BOX USING QDATA1
    if (CONTROLS.drawShell1) {
      // Save current coordinate system
      push();
      // move origin from (0, 0, 0) to (0, -800, 0), which is the center of the first shell
      translate(0, -800, 0);
      // draw the box according to the (n+1)th output in qdata1
      drawBox(q1, n);
      // Move origin back to (0, 0, 0)
      pop();
    }

    // DRAW THE (n+1)th BOX USING QDATA2
    if (CONTROLS.drawShell2) {
      // Save current coordinate system
      push();
      // move origin to (0, 800, 0), which is the center of the second shell
      translate(0, 800, 0);
      // Reflect the entire structure across the y-axis (so that the two "shells" are facing each other)
      // Now, the positive y-axis points up instead of down
      scale(1, -1, 1);
      // draw the box according to the (n+1)th output in qdata2
      drawBox(q2, n);
      // move origin back to (0, 0, 0)
      pop();
    }
    
    // DRAW STAR AT A PSEUDORANDOM POSITION
    if (CONTROLS.drawStars) {
      // inputs: the (n+1)th measurements from qdata1 and qdata2
      drawStar(q1, q2);
    }
    
  }
  
}