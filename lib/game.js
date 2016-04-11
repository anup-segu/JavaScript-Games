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

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.asteroids.forEach(function (asteroid) {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(function (asteroid) {
    asteroid.move();
  });
};

Game.DIM_X = 1000;
Game.DIM_Y = 1000;
Game.NUM_ASTEROIDS = 3;

module.exports = Game;
