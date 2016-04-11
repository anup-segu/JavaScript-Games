var MovingObject = require("./movingObject");
var Util = require("./utils");

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

module.exports = Ship;
