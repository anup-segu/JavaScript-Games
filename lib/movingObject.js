var MovingObject = function (options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
};

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
  // console.log(this.pos);
};

MovingObject.prototype.distance = function (otherObject) {
  var x1 = this.pos[0];
  var x2 = otherObject.pos[0];
  var y1 = this.pos[1];
  var y2 = otherObject.pos[1];

  return Math.sqrt( Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2) );
};

MovingObject.prototype.isCollideWith = function (otherObject) {
  var sumRadii = this.radius + otherObject.radius;
  var distance = this.distance(otherObject);

  return sumRadii >= distance;
};

MovingObject.prototype.collideWith = function(otherObject) {
  // this.game.remove(this);
  // this.game.remove(otherObject);
};


module.exports = MovingObject;
