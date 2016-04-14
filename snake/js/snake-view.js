var Board = require("./snake");

var View = function (board, $el) {
  this.$el = $el;
  this.board = board;
  this.setupView();
  this.bindEvents();

  var that = this;

  // while (!that.board.isOver()) {
  //   setTimeout(function() {
  //     that.render();
  //     that.moveSnake();
  //   }, 300);
  // }
  //
  // alert("Game Over");

  //
  var run = setInterval(function(){
    if (!that.board.isOver()) {
      that.render();
      that.moveSnake();
    } else {
      clearInterval(run);
      alert("Game Over!");
    }
  }, 300);
};

View.prototype.bindEvents = function () {
  var that = this;
  $("body").keypress(function (e) {
      if (e.keyCode === 97) {
        that.board.snake.turn("W");
      } else if (e.keyCode === 119) {
        that.board.snake.turn("N");
      } else if (e.keyCode === 100) {
        that.board.snake.turn("E");
      } else if (e.keyCode === 115) {
        that.board.snake.turn("S");
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
  this.board.move();
};

View.prototype.render = function () {
  $("li").removeClass("snake");
  $("li").removeClass("apple");

  var that = this;
  $("li").each(function($li){
    var li = this;
    that.board.snake.segments.forEach( function(el) {
      var pos = $(li).attr("data-pos");
      if (el.toString() === pos) {
        $(li).addClass("snake");
      }
    });

    if ($(li).attr("data-pos") === that.board.apple.toString()) {
      $(li).addClass("apple");
    }
  });
};

module.exports = View;
