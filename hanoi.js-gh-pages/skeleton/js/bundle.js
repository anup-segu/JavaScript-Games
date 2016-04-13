/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var HanoiView = __webpack_require__(1);
	//...require appropriate file
	var HanoiGame = __webpack_require__(2);
	//...require appropriate file(look in /hanoi-core-solution)
	
	$(function () {
	  var rootEl = $('.hanoi');
	  var game = new HanoiGame();
	  var view = new HanoiView(game,rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	        if (!that.game.move(that.moveChoice, Number($ul.attr("data-pos")))) {
	          throw new Error();
	        }
	        console.log(that.game.towers);
	        that.moveChoice = undefined;
	        that.render();
	      }
	      catch (err) {
	        alert("Invalid move!");
	        that.moveChoice = undefined;
	      }
	      $("ul").removeClass("selected");
	    } else {
	      $ul.addClass("selected");
	      that.moveChoice = Number($ul.attr("data-pos"));
	    }
	    that.isOver();
	  });
	};
	
	HanoiView.prototype.isOver = function() {
	  if (this.game.isWon()) {
	
	    $(".hanoi").addClass("game-over");
	    $("ul").off("click");
	
	    alert("Congrats");
	  }
	};
	
	module.exports = HanoiView;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};
	
	Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
	  var startTower = this.towers[startTowerIdx];
	  var endTower = this.towers[endTowerIdx];
	
	  if (startTower.length === 0) {
	    return false;
	  } else if (endTower.length == 0) {
	    return true;
	  } else {
	    var topStartDisc = startTower[startTower.length - 1];
	    var topEndDisc = endTower[endTower.length - 1];
	    return topStartDisc < topEndDisc;
	  }
	};
	
	Game.prototype.isWon = function () {
	  // move all the discs to the last or second tower
	  return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};
	
	Game.prototype.move = function (startTowerIdx, endTowerIdx) {
	  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	    return true;
	  } else {
	    return false;
	  }
	};
	
	Game.prototype.print = function () {
	  console.log(JSON.stringify(this.towers));
	};
	
	Game.prototype.promptMove = function (reader, callback) {
	  this.print();
	  reader.question("Enter a starting tower: ", function (start) {
	    var startTowerIdx = parseInt(start);
	    reader.question("Enter an ending tower: ", function (end) {
	      var endTowerIdx = parseInt(end);
	      callback(startTowerIdx, endTowerIdx)
	    });
	  });
	};
	
	Game.prototype.run = function (reader, gameCompletionCallback) {
	  this.promptMove(reader, (function (startTowerIdx, endTowerIdx) {
	    if (!this.move(startTowerIdx, endTowerIdx)) {
	      console.log("Invalid move!");
	    }
	
	    if (!this.isWon()) {
	      // Continue to play!
	      this.run(reader, gameCompletionCallback);
	    } else {
	      this.print();
	      console.log("You win!");
	      gameCompletionCallback();
	    }
	  }).bind(this));
	};
	
	module.exports = Game;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map