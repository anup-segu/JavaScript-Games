var Board = require("./snake");

var View = function (board, $el) {
  this.$el = $el;
  this.board = board;
  this.setupView();
  this.bindEvents();

  var that = this;
  setInterval(function(){
    if (!that.board.isOver()) {
      that.moveSnake();
    }
  }, 500);
};

View.prototype.bindEvents = function () {
  $("li").keypress(function (e) {
      if (e.keyCode === 37) {
        this.board.snake.turn("W");
      } else if (e.keyCode === 38) {
        this.board.snake.turn("N");
      } else if (e.keyCode === 39) {
        this.board.snake.turn("E");
      } else if (e.keyCode === 40) {
        this.board.snake.turn("S");
      }
  });
};


View.prototype.setupView = function () {
  var ul = document.createElement("ul");
  this.$el.append(ul);
  var $ul = $(ul);

  for (var i = 0; i < this.board.width; i++) {
    for (var j = 0; j < this.board.height; j++) {
      var li = document.createElement("li");
      var $li = $(li);
      $li.attr("data-pos", [i, j]);
      $ul.append($li);
    }
  }
};
View.prototype.moveSnake = function () {
  this.board.snake.move();
};

module.exports = View;
