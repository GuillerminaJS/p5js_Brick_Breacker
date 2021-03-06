function Pelota() {
  // this.pos = createVector(width / 2, height / 2);
  this.pos = createVector(50, 50);
  console.log(this.pos);
  this.r = 30;
  this.direction = createVector(1,1);
  this.vel = createVector(1, 1).mult(6);

  this.display = function() {
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }

  this.update = function() {
    this.pos.x += this.vel.x * this.direction.x;
    this.pos.y += this.vel.y * this.direction.y;
  }

  this.checkEdges = function() {
    if (this.pos.y < this.r && this.direction.y < 0) //A dalt
      this.direction.y *= -1;
    else if (this.pos.x < this.r && this.direction.x < 0)
      this.direction.x *= -1;
    else if (this.pos.x > width - this.r && this.direction.x > 0)
      this.direction.x *= -1;
  }

  this.meets = function(barra) {
    if (this.pos.y < barra.pos.y &&
        this.pos.y > barra.pos.y - this.r &&
        this.pos.x > barra.pos.x - this.r &&
        this.pos.x < barra.pos.x + barra.w + this.r) {
        return true;
      } else return false;
  }

  this.hits = function(ladrillo) {
    var distance = dist(this.pos.x, this.pos.y, ladrillo.pos.x, ladrillo.pos.y);
    if (distance < this.r + ladrillo.r) return true;
    else return false;
  }
}
