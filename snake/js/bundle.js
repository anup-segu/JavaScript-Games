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

	var Board = __webpack_require__(1);
	var View = __webpack_require__(2);
	$(function () {
	  var b = new Board(40, 40);
	  var view = new View(b, $(".game"));
	
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Snake = function () {
	  this.direction = "E";
	  this.segments = [[0,0],[0,1],[0,2]];
	};
	
	Snake.DIRS = {
	  "N": [-1,0],
	  "S": [1,0],
	  "E": [0,1],
	  "W": [0,-1]
	};
	
	Snake.prototype.move = function () {
	  this.segments.shift();
	  this.segments.push(
	    this.segments[this.segments.length - 1]
	      .plus(Snake.DIRS[this.direction])
	  );
	
	};
	
	Snake.prototype.turn = function (direction) {
	  this.direction = direction;
	};
	
	Snake.prototype.isOver = function () {
	  var lastElem =  this.segments[this.segments.length -1].toString();
	  var test = false;
	  var that = this;
	  this.segments.forEach(function(elem, idx) {
	    if (idx !== that.segments.length -1) {
	      if (elem.toString() === lastElem){
	        test =  true;
	      }
	    }
	  });
	  return test;
	};
	
	var Board = function (width, height) {
	  this.snake = new Snake();
	  this.width = width;
	  this.height = height;
	};
	
	Board.prototype.isOver = function () {
	  return this.snake.isOver() || this.isOutOfBounds();
	};
	
	Board.prototype.isOutOfBounds = function () {
	  var pos = this.snake.segments[this.snake.segments.length - 1];
	
	  return pos[0] >= this.width ||
	    pos[1] >= this.height ||
	    pos[0] < 0 ||
	    pos[1] < 0;
	};
	
	Array.prototype.plus = function (direction) {
	  return [this[0] + direction[0], this[1] + direction[1]];
	};
	
	Array.prototype.equals = function (pos) {
	  return this[0] === pos[0] && this[1] === pos[1];
	};
	module.exports = Board;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(1);
	
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
	      alert("out of bounds");
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
	  this.board.snake.move();
	};
	
	View.prototype.render = function () {
	  $("li").removeClass("snake");
	  var that = this;
	  $("li").each(function($li){
	    var li = this;
	    that.board.snake.segments.forEach( function(el) {
	      var pos = $(li).attr("data-pos");
	      if (el.toString() === pos) {
	        $(li).addClass("snake");
	      }
	    });
	  });
	};
	
	module.exports = View;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map