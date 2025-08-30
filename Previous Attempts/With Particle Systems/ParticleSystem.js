class ParticleSystem {
  
  constructor(qdata, invalidOutputs) {
    
    // create an empty container for particles
    this.particles = [];
    
    // add 1000 particles to the particles array
    for (let n = 0; n < qdata.length; n++) {
      
      // obtain the binary output for the nth shot and the (n+1)th shot and combine them into one binary string
      // 0000 to 1111 = 0 to 15
      let b = qdata[n];
      // obtain the decimal equivalent of the binary number
      let d = parseInt(b, 2); 
      
      // calculate the inital x and y position of the nth particle
      let a = map(n, 0, qdata.length, 0, 360);
      a += d*20;
      let x = 200 * cos(a);
      let y = 200 * sin(a);
      
      
      // determine the color of the particle
      let err = invalidOutputs.includes(b);
      
      // create new particle and add it to the particles container/array
      let p = new QParticle(x, y, b, err);
      this.particles.push(p);
      
    }
    
    // for adding new particles
    this.counter = 0;
        
  }
  
  // updates, displays each particle and removes particle from container when lifespan is over
  run(force) {
    
    // set the origin (0, 0) to the center of the canvas
    push();
    translate(width/2, height/2);
    
    for (let n = 0; n < this.particles.length; n++) {
      
      let p = this.particles[n];
      let d = parseInt(p.measurement, 2);

      p.display();
      
      let f = p5.Vector.sub(createVector(0, 0), p.position);
      f.rotate(d*5 + 10);
      p.applyForce(f);
      
      
      // if (p.isError) {
      //   p.applyForce(createVector(-10, 100));
      //   // p.applyForce(p5.Vector.mult(f, -1))
      // }
      
      p.update();
      if (p.lifespan < 0) {
        this.particles.splice(n);
      }
      
    }
    
    pop();
    
  }
  
}