var MovingObject = require("./movingObject");
var Util = require("./utils");

var Bullet = function (posOptions) {
  var options = {};
  options.pos = posOptions.pos;
  options.vel = posOptions.vel;
  options.color = Bullet.COLOR;
  options.radius = Bullet.RADIUS;
  options.game = posOptions.game;
  MovingObject.call(this, options);
};

Util.inherits(Bullet, MovingObject);

Bullet.COLOR = "red";
Bullet.RADIUS = 3;

Bullet.prototype.collideWith = function(otherObject) {

  if (otherObject.name() === "Asteroid") {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
};

Bullet.prototype.isWrappable = function() {
  return false;
};

Bullet.prototype.name = function() {
  return "Bullet";
};

Bullet.SPEED = 15;

module.exports = Bullet;
