var HanoiView = require("./hanoi-view");
//...require appropriate file
var HanoiGame = require("../../hanoi-core-solution/game");
//...require appropriate file(look in /hanoi-core-solution)

$(function () {
  var rootEl = $('.hanoi');
  var game = new HanoiGame();
  var view = new HanoiView(game,rootEl);
  view.setupTowers();
});
