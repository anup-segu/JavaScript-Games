var HanoiView = function (game, $rootEl) {
  this.$rootEl = $rootEl;
  this.game = game;
};

HanoiView.prototype.setupTowers = function () {

  for (var i = 0; i < 3; i++) {
    var ul = document.createElement("ul");
    this.$rootEl.append(ul);
    var $ul = $(ul);

    for (var j = 0; j < 3; j++) {
      var li = document.createElement("li");
      var $li = $(li);
      if (i === 0) {
        $li.addClass("disk-" + (j + 1));
      }
      $li.attr("data-pos", j);
      $ul.append($li);
    }

  }
};


module.exports = HanoiView;
