var MovingObject = require("./movingObject.js");
var Util = require("./utils.js");

var Asteroid = function(posOptions){
  var options = {};
  options.pos = posOptions.pos;
  options.vel = [10,10];
  options.color = Asteroid.COLOR;
  options.radius = Asteroid.RADIUS;

  MovingObject.call(this, options);
};

Asteroid.COLOR = "#2F3248";
Asteroid.RADIUS = 50;

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
