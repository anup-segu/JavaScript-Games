var View = function (game, $el) {
  this.$el = $el;
  this.game = game;
};

View.prototype.bindEvents = function () {
};

View.prototype.makeMove = function ($square) {
};

View.prototype.setupBoard = function () {
  var ul = document.createElement("ul");

  this.$el.append(ul);
  var $ul = $(ul);

  for (var i = 0; i < 9; i++) {
    var li = document.createElement("li");
    $ul.append(li);
  }

};

module.exports = View;
