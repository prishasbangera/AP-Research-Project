// For the "shells," each binary output corresponds to a color
const COLOR_RULES = {
  '0000': [23, 40, 40],
  '0001': [70, 20, 70],
  '0011': [39, 23, 117], 
  '0100': [7, 93, 102],       
  '0101': [80, 38, 66],
  '0111': [18, 35, 100], 
  '1000': [35, 97, 80],  
  '1001': [20, 78, 153], 
  '1011': [38, 5, 89], 
  '1100': [40, 48, 66], 
  '1101': [6, 100, 28], 
  '1111': [255, 255, 255]
};


// Draw box for one measurement/output in the list of quantum data
// q: the (n+1)th measurement in binary
// n: the index of this measurement in the list of outputs
function drawBox(q, n) {
  
  // Convert q, a binary number, to decimal
  let b = parseInt(q, 2);
  
  // If q is included in the list invalidOutputs, set isError to true because q occurred due to quantum errors
  let isError = ERROR_VALUES.includes(q);
  
  // Obtain the theoretical probability of obtaining q as an output for this quantum circuit
  let p = PROBABILITIES[q];
  
  // Determine the height of the box, which is directly proportional to the probability
  let h = 4 + p * 400;
  
  // Save the current coordinate system (origin is now at the center of the shell)
  push();
  
  // Determine the color and length of sides of this box (s)
  let s; // 10 for erroneous output, 7 otherwise

  if (isError) {
    // If q is an invalid output/error
    s = 10;
    // Set color to a translucent reddish-pink
    // Red = 255, green = 50, blue = 100, alpha/opacity = 150
    fill(255, 50, 100, 200);
  } else {
    // If q is not an invalid output/error
    s = 7;
    // Retrieve the color from colorRules according to q
    // For example, if q = "1111", the color would be [255, 255, 255] (white) 
    let clr = color(COLOR_RULES[q]);
    clr.setAlpha(100); // Make the color translucent
    fill(clr); // Set color to clr
  }
  
  // Determine the position of the box according to n //
  
  // 2D distance away from origin (on the xz plane) starts at 50 and is directly proportional to n
  let rad = 70 + n * 0.4;
  
  // Angle between radius and positive x axis is also directly proportional to n
  // 137.508 degrees is approximately the "golden angle"
  let ang = n * 137.507;
  
  // Calculate the y (height) of the box above the origin
  // As n increases, y increases exponentially
  // y = 0.15 * 2^(n*0.01 + 0.5) + h/2
  let y = 0.15 * pow(2, n*0.01 + 0.5) + h/2;
  
  // Rotate the coordinate system by the angle
  rotateY(ang);
  
  // Translate the origin a 2D distance away (rad) and to height y
  translate(rad, y, 0);
  
  // Draw the box with side length s and height h at the current origin
  box(s, h, s);
  
  // Move the origin back to the center of the shell
  pop();
  
}