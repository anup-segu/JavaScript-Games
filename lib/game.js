var Asteroid = require("./asteroid");

var Game = function () {
  this.asteroids = [];
  this.addAsteroids();
};

Game.prototype.addAsteroids  = function() {
  for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({ pos: this.randomPosition() }));
  }
};

Game.prototype.randomPosition = function(){
  var x = Math.random() * Game.DIM_X;
  var y = Math.random() * Game.DIM_Y;
  return [x, y];
};

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 3;

module.exports = Game;
