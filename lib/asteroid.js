var MovingObject = require("./movingObject.js");
var Util = require("./utils.js");

var Asteroid = function(posOptions){
  var options = {};
  options.pos = posOptions.pos;
  options.vel = Util.randomVec(Asteroid.LENGTH);
  options.color = Asteroid.COLOR;
  options.radius = Asteroid.RADIUS;

  MovingObject.call(this, options);
};

Asteroid.LENGTH = 10;
Asteroid.COLOR = "#2F3248";
Asteroid.RADIUS = 50;

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
