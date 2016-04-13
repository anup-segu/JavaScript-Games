var View = function (game, $el) {
  this.$el = $el;
  this.game = game;
  this.mark = "x";
};

View.prototype.bindEvents = function () {
  var that = this;
  $("li").on("click", function() {

    that.makeMove($(this));
  });
};

View.prototype.makeMove = function ($square) {
  var pos = $square.attr("data-pos").split(",");
  pos = pos.map(function(el) {
    return Number(el);
  });
  try {
    this.game.playMove(pos);
    var mark = this.game.board.grid[pos[0]][pos[1]];
    $square.text(mark);
    if (mark === "x") {
      $square.css("background-color", "blue");
    } else {
      $square.css("background-color", "orange");
    }
  }
  catch (err) {
    alert("Invalid Move");
  }
};

View.prototype.setupBoard = function () {
  var ul = document.createElement("ul");

  this.$el.append(ul);
  var $ul = $(ul);

  for (var i = 0; i < 9; i++) {
    var li = document.createElement("li");
    var row = Math.floor(i / 3);
    var col = i % 3;
    var $li = $(li);
    $li.attr("data-pos", [row, col]);
    $ul.append($li);
  }

};

module.exports = View;
