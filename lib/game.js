var Asteroid = require("./asteroid");

var Game = function () {
  this.asteroids = [];
  this.addAsteroids();
};

Game.prototype.addAsteroids  = function() {
  for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    var asteroid = new Asteroid({ pos: this.randomPosition(), game: this });
    this.asteroids.push(asteroid);
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

Game.prototype.wrap = function (pos) {
  var x = pos[0];
  var y = pos[1];

  if (x >= 1000) {
    x = 0;
    y = 1000 - y;
  } else if (x <= 0) {
    x = 1000;
    y = 1000 - y;
  }

  if (y >= 1000) {
    y = 0;
    x = 1000 - x;
  } else if (y <= 0) {
    y = 1000;
    x = 1000 - x;
  }

  return [x, y];
};

Game.prototype.checkCollisions = function () {
  this.asteroids.forEach( function(asteroid, i) {
    this.asteroids.slice(i + 1).forEach(function(otherAsteroid){
      if (asteroid.isCollideWith(otherAsteroid)) {
        console.log("COLLISION");
      }
    });
  }.bind(this));
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.DIM_X = 1000;
Game.DIM_Y = 1000;
Game.NUM_ASTEROIDS = 10;

module.exports = Game;
