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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* globals $ */
	
	var View = __webpack_require__(2);
	
	$(function () {
	  var $easel = $("#easel");
	  new View($easel);
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	function View($el) {
	  this.$el = $el;
	  this.setupEasel();
	}
	
	View.prototype.exercise0 = function () {
	  //Challenge: (example) remove the 'square' class from every li
	  //Result: this should cause the grid to turn into a long list of undecorated lis
	  //just a list of dots
	
	  //this one completed as an example :) no additional code necessary
	  $('li').removeClass("square");
	};
	
	View.prototype.exercise1 = function () {
	  //Challenge: Give every square the class 'orange'
	  //Result: every square should turn orange (we already have a CSS rule)
	
	  //your code here!
	  $('li').addClass("orange");
	};
	
	View.prototype.exercise2 = function () {
	  //Challenge: Give every square a dashed border
	  //Result: Every square gets a dashed border. The grid is no longer a square
	  //because the dimensions of the squares are different and they no longer fit
	  //into the grid's width.
	
	  //your code here!
	  $('li').css("border", "dashed");
	};
	
	View.prototype.exercise3 = function () {
	  //Challenge: Add an <h1> with the text 'i love jquery' under the grid.
	  //Result: An <h1> with the text 'i love jquery' appears under the grid.
	
	  //your code here!
	  $('body').append("<h1>i love jquery</h1>");
	};
	
	View.prototype.exercise4 = function () {
	  //Challenge: Write your first name in every other square.
	  //Result: Your name appears in every other square.
	
	  //your code here!
	  $('li').each(function (index){
	    if (index % 2 === 0){
	      $("<p>Anup</p>").appendTo(this);
	    }
	  });
	};
	
	View.prototype.exercise5 = function () {
	  //Challenge: Alert the row and column of the square, when the square is clicked.
	  //Result: When a square is clicked, the row and column appear in an alert. for
	  //example: clicking the top left square should alert '0, 0'.
	
	  //hint: look at line 28 of this file: we set the 'data-pos' of every square
	  //your code here!
	  $('li').on("click", function(){
	    var $square = $(event.currentTarget);
	    // console.log($square.data("pos"));
	    alert($square.data("pos"));
	  });
	};
	
	View.prototype.exercise6 = function () {
	  //Challenge: Give every square a random color!
	  //Result: Every square becomes a color as soon as this code runs. The grid
	  //should become a beautiful rainbow of colors.
	
	  //your code here!
	  //hint: this array might make it easy to assign random colors
	  var colors = [
	    'darksalmon',
	    'cornflowerblue',
	    'red',
	    'yellow',
	    'wheat',
	    'hotpink',
	    'lawngreen'
	  ];
	
	  var randomNum = function(){
	    return Math.floor(Math.random() * colors.length);
	  };
	
	  $('li').each(function (index, el) {
	    var $li = $(el);
	    $li.css("background-color", colors[randomNum()]);
	  });
	};
	
	View.prototype.exercise7 = function(){
	  //Challenge: When your mouse goes over a square, console log its color.
	  //Result: When the mouse goes over a square its color should appear in the
	  //console. The color won't be the color's name, but its rbg value.
	  //You should push the button for exercise 6 first to try it on the
	  //rainbow.
	
	  //your code here!
	  $('li').hover(function() {
	    var $el = $(this);
	    console.log($el.css("background-color"));
	  });
	};
	
	
	View.prototype.setupEasel = function () {
	  var $addRowButton = $("<button>").html("Add a row");
	  this.$el.append($addRowButton);
	  $addRowButton.on("click", this.addRow.bind(this));
	
	  for(var j = 0; j <= 7; j++){
	    var $button = $("<button>").html("Exercise " + j);
	    $button.on("click", this["exercise" + j]);
	    this.$el.append($button);
	  }
	
	  for(var i = 0; i < 20; i ++) {
	    this.addRow();
	  }
	
	  this.bindEvents();
	};
	
	View.prototype.bindEvents = function () {
	  var colors = [
	    'darksalmon',
	    'cornflowerblue',
	    'red',
	    'yellow',
	    'wheat',
	    'hotpink',
	    'lawngreen'
	  ];
	
	  this.$el.on("mouseenter", ".square", function (e) {
	    var $square = $(e.currentTarget);
	    var numColor = Math.floor(Math.random() * colors.length);
	    $square.css("background-color", colors[numColor]);
	  });
	};
	
	View.prototype.addRow = function () {
	  var rowIdx = this.$el.find(".row").length;
	  var $row = $("<ul>").addClass("row").addClass("group");
	  for(var colIdx = 0; colIdx < 20; colIdx++) {
	    var $square = $("<li>").addClass("square").attr("data-pos", [rowIdx, colIdx]);
	    $row.append($square);
	  }
	  this.$el.append($row);
	};
	
	
	//WARNING SOLUTIONS BELOW!!!!
	//WORK AS HARD AS POSSIBLE ON SOLVING EACH PROBLEM
	//BEFORE READING ITS SOLUTION
	//
	// View.prototype.exercise1 = function () {
	//   $("li").addClass("orange");
	// };
	//
	//
	//
	//
	//
	//
	//
	//
	// View.prototype.exercise2 = function () {
	//   $(".square").css("border", "dashed");
	// };
	//
	//
	//
	//
	//
	//
	//
	//
	//
	// View.prototype.exercise3 = function () {
	//   var h1 = $("<h1>").text("I love jQuery");
	//   $("#easel").append(h1);
	// };
	//
	//
	//
	//
	//
	//
	//
	//
	//
	// View.prototype.exercise4 = function () {
	//   $(".square:nth-child(even)").text("Jeff");
	//   //this could also be solved using iteration and %
	// };
	//
	//
	//
	//
	//
	//
	//
	//
	//
	// View.prototype.exercise5 = function () {
	//   //hint: look at line 28 of this file: we set the 'data-pos' of every square
	//   $('.square').on("click", function(e){
	//     var $sq = $(e.currentTarget);
	//     alert($sq.attr("data-pos"));
	//   });
	// };
	//
	//
	//
	//
	//
	//
	//
	//
	//
	// View.prototype.exercise6 = function () {
	//   var colors = [
	//     'darksalmon',
	//     'cornflowerblue',
	//     'red',
	//     'yellow',
	//     'wheat',
	//     'hotpink',
	//     'lawngreen'
	//   ];
	//
	//   $('.square').each(function(idx, el){
	//     var $sq = $(el);
	//     var color = colors[Math.floor((Math.random() * colors.length))];
	//     $sq.css("background-color", color)
	//   })
	// };
	//
	//
	//
	//
	//
	//
	//
	//
	//
	// View.prototype.exercise7 = function(){
	//   $('#easel').on("mouseenter", ".square", function(e){
	//     var $sq = $(e.currentTarget);
	//     console.log($sq.css("background-color"));
	//   });
	// };
	
	module.exports = View;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map