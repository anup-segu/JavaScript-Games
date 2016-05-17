var MovingObject = require("./movingObject.js");
var Util = require("./utils.js");
// var Ship = require("./ship") ;

var Asteroid = function(posOptions){
  var options = {};
  options.pos = posOptions.pos;
  options.vel = Util.randomVec(Asteroid.LENGTH);
  options.color = Asteroid.COLOR;
  options.radius = Asteroid.RADIUS;
  options.game = posOptions.game;
  MovingObject.call(this, options);
};

Asteroid.LENGTH = 10;
Asteroid.COLOR = "#2F3248";
Asteroid.RADIUS = 30;

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject.name() === "Ship") {
    // this.game.remove(this);
    otherObject.relocate();
  }
};

Asteroid.prototype.name = function() {
  return "Asteroid";
};

module.exports = Asteroid;
