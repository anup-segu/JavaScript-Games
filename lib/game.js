var Asteroid = require("./asteroid");
var Ship = require("./ship");
var Bullet = require("./bullet");

var Game = function () {
  this.asteroids = [];
  this.addAsteroids();

  this.ship = new Ship({ pos: this.randomPosition(250, 750), game: this });
  this.bullets = [];
};

Game.DIM_X = 1000;
Game.DIM_Y = 1000;
Game.NUM_ASTEROIDS = 5;

Game.prototype.allObjects = function () {
  return this.bullets.concat(this.asteroids).concat([this.ship]);
};

Game.prototype.addAsteroids  = function() {
  for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    var asteroid = new Asteroid({ pos: this.randomPosition(), game: this });
    this.asteroids.push(asteroid);
  }
};

Game.prototype.add = function(object) {
  if (object instanceof Bullet) {
    this.bullets.push(object);
  } else if ( object instanceof Asteroid) {
    this.asteroids.push(object);
  }
};

Game.prototype.randomPosition = function (min, max) {
  var maxX = max;
  var minX = min;
  var maxY = max;
  var minY = min;
  if (max === undefined || min === undefined) {
    maxX = Game.DIM_X;
    minX = 0;
    maxY = Game.DIM_Y;
    minY = 0;
  }

  var x = Math.random() * (maxX - minX) + minX;
  var y = Math.random() * (maxY - minY) + minY;
  return [x, y];
};

Game.prototype.isOutOfBounds = function (pos) {
  return (pos[0] >= Game.DIM_X) || (pos[1] >= Game.DIM_Y);
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach(function (object) {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(function (object) {
    object.move();
  });
};

Game.prototype.wrap = function (pos) {
  var x = pos[0];
  var y = pos[1];

  if (x >= Game.DIM_X) {
    x = 0;
    y = Game.DIM_Y - y;
  } else if (x <= 0) {
    x = Game.DIM_X;
    y = Game.DIM_Y - y;
  }

  if (y >= Game.DIM_Y) {
    y = 0;
    x = Game.DIM_Y - x;
  } else if (y <= 0) {
    y = Game.DIM_Y;
    x = Game.DIM_X - x;
  }

  return [x, y];
};

Game.prototype.checkCollisions = function () {
  this.allObjects().forEach( function(object, i) {
    this.allObjects().slice(i + 1).forEach(function(otherObject){
      if (object.isCollideWith(otherObject)) {
        object.collideWith(otherObject);
      }
    });
  }.bind(this));
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function (object) {
  if (object instanceof Asteroid) {
    var i = this.asteroids.indexOf(object);
    this.asteroids.splice(i, 1);
  } else if (object instanceof Bullet) {
    var j = this.bullets.indexOf(object);
    this.bullets.splice(j, 1);
  }

};

module.exports = Game;
