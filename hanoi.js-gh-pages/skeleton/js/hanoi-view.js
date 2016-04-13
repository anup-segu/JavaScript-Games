var HanoiView = function (game, $rootEl) {
  this.$rootEl = $rootEl;
  this.game = game;
  this.setupTowers();
  this.render();
  this.clickTower();
};

HanoiView.prototype.setupTowers = function () {

  for (var i = 0; i < 3; i++) {
    var ul = document.createElement("ul");
    this.$rootEl.append(ul);
    var $ul = $(ul);
    $ul.attr("data-pos", i);

    for (var j = 0; j < 3; j++) {
      var li = document.createElement("li");
      var $li = $(li);

      $ul.append($li);
    }

  }
};

HanoiView.prototype.render = function () {
  var that = this;
  $("li").removeClass("disk-1");
  $("li").removeClass("disk-2");
  $("li").removeClass("disk-3");
  this.game.towers.forEach( function(el, towerIdx) {

    if(el.length > 0) {
      el.forEach( function (val, diskIdx) {
        var $li = $(".hanoi > ul:nth-child(" +
          (towerIdx + 1) + ") > li:nth-last-child(" +
          (diskIdx + 1) + ")");

        $li.addClass("disk-" + (val));
      });
    }
  });
};

HanoiView.prototype.clickTower = function() {
  var that = this;
  $("ul").on("click", function() {
    var $ul = $(this);

    if (that.moveChoice !== undefined) {
      try {
        console.log($ul.attr("data-pos"));
        that.game.move(that.moveChoice, Number($ul.attr("data-pos")));
        console.log(that.game.towers);
        that.moveChoice = undefined;
        that.render();
      } catch (err) {
        alert(err.msg);
      }
    } else {
      that.moveChoice = Number($ul.attr("data-pos"));
    }
  });
};


module.exports = HanoiView;
