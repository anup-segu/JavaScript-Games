var Game = require("./game");

var GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  setInterval(function () {
    this.game.step();
    this.game.draw(this.ctx);
  }.bind(this), 20);
};

GameView.prototype.bindKeyHandlers = function () {
  var gameView = this;

  var SHIP_SPEED = 2.0;

  key('w', function () {
    gameView.game.ship.power([0, -SHIP_SPEED]);
  });

  key('s', function () {
    gameView.game.ship.power([0, SHIP_SPEED]);
  });

  key('a', function () {
    gameView.game.ship.power([-SHIP_SPEED, 0]);
  });

  key('d', function () {
    gameView.game.ship.power([SHIP_SPEED, 0]);
  });
};

module.exports = GameView;
