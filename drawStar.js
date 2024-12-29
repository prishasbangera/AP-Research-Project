// Draw star at a pseudorandom position
// q1 is the (n+1)th measurement from qdata1
// q2 is the (n+1)th measurement from qdata2
function drawStar(q1, q2) {
  
  // CALCULATE THE PSEUDORANDOM POSITION OF THE STAR
  
  // Get a pseudorandom 2D distance away from the y axis (on the xz plane) using a Gaussian function
  // Mean = 0, Standard deviation = 100
  let rad = randomGaussian(0, 100);
  
  // Get a random angle from 0 to 360
  let ang = random(0, 360);
  
  // y value is random from -800 to 800
  let y = random(-800, 800);
  
  // CALCULATE STAR SIZE
  
  // Convert q1 and q2 to decimal values
  let d1 = parseInt(q1, 2);
  let d2 = parseInt(q2, 2);
  
  // Find the distance between d1 and d2
  // s is directly proportional to this distance
  let s = abs(d1 - d2) * 0.3 + 1;
  
  // DRAW THE STAR
  
  // At this point, the origin is at the center of the screen
  
  // Save current coordinate system
  push();
  
  // Translate the origin to the psuedorandom position
  rotateY(ang);
  translate(rad, y, 0);

  
  // Draw the inner part of the star
  fill(255); // Set color to white
  sphere(0.6 * s); // Draw a tiny sphere at the current origin
  
  // Draw the outer part of the star
  fill(100 + d1*20, 50 + 100*d2, 200 + d2*10, 80); // Set color by calculating the red, green, and blue values with d1 and d2
  sphere(s); // Draw a slightly larger sphere at the same position
  
  // Revert origin back to center of screen
  pop();

}