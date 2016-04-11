var GameView = require("./gameView");
var Game = require("./game");

var canvasEl = document.getElementById("game-canvas");
canvasEl.width = Game.DIM_X;
canvasEl.height = Game.DIM_Y;

var ctx = canvasEl.getContext("2d");

// console.log(canvasEl);

var game = new Game;

var gameView = new GameView(game, ctx);


gameView.start();
