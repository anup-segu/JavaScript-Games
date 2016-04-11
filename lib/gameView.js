var Game = require("./game");

var GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  setInterval(function () {
    this.game.step();
    this.game.draw(this.ctx);
  }.bind(this), 20);
};

module.exports = GameView;
