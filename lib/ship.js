var MovingObject = require("./movingObject");
var Util = require("./utils");
var Bullet = require("./bullet");

var Ship = function (posOptions) {
  var options = {};
  options.pos = posOptions.pos;
  options.vel = [0,0];
  options.color = Ship.COLOR;
  options.radius = Ship.RADIUS;
  options.game = posOptions.game;
  MovingObject.call(this, options);
};

Util.inherits(Ship, MovingObject);

Ship.RADIUS = 10;
Ship.COLOR = "#009933";

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.fireBullet = function () {
  var bullet = new Bullet({
    pos: this.pos,
    game: this.game,
    vel: [0,-1 * Bullet.SPEED]
  });

  this.game.add(bullet);

};

module.exports = Ship;
