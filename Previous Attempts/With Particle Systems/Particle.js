// https://natureofcode.com/book/chapter-6-autonomous-agents/

class QParticle {
  
  constructor(x, y, measurement, isError) {
    
    this.position = createVector(x, y);
    this.position = createVector(x, y);
    this.previousPosition = this.position;
    
    this.measurement = measurement;
    this.isError = isError;
      
    this.setParameters();
    
  }
  
  setParameters() {
    
    let d = parseInt(this.measurement, 2);
    
    this.maxSpeed = 2;
    this.lifespan = 90 + d*5;
    // determine initial velocity
    this.velocity = createVector(this.position.x-d, this.position.y-d);
    this.acceleration = createVector(0, 0);
    
      if (this.isError) {
        this.mass = 2;
        this.clr = color(255, 0, 200, 200);
        this.velocity.rotate(d);
        this.velocity.add([-d, -d]);
      } else { 
        this.mass = 3;
        // if (d < 7) {
          this.clr = color(50, 255 - d*10, 200 + d*30, 150);
        // } else {
          // this.clr = color(img.get(this.position.x + width/2, this.position.y + height/2));
          this.clr.setAlpha(80);
        // }
      }
    
  }
  
  applyForce(force) {
    // Calculate acceleration from this force = Force / mass
    let acc = p5.Vector.div(force, this.mass);
    this.acceleration.add(acc);
  }
  
  update() {
    
    // save previous position
    this.previousPosition = this.position;
    
    // update position
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    
    // subtract 1 from lifespan
    this.lifespan--;
    
  }
  
  display() {
    push();
    stroke(this.clr);
    strokeWeight(this.mass);
    line(this.previousPosition.x, this.previousPosition.y, this.position.x, this.position.y);
    // stroke(255);
    // point(this.position.x + 1, this.position.y - 1);
    
    pop();
  }
  
}