/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Asteroid = __webpack_require__(1);

	var Game = function () {
	  this.asteroids = [];
	  this.addAsteroids();
	};

	Game.prototype.addAsteroids  = function() {
	  for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
	    this.asteroids.push(new Asteroid({ pos: this.randomPosition() }));
	  }
	};

	Game.prototype.randomPosition = function(){
	  var x = Math.random() * Game.DIM_X;
	  var y = Math.random() * Game.DIM_Y;
	  return [x, y];
	};

	Game.DIM_X = 500;
	Game.DIM_Y = 500;
	Game.NUM_ASTEROIDS = 3;

	module.exports = Game;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(2);
	var Util = __webpack_require__(3);

	var Asteroid = function(posOptions){
	  var options = {};
	  options.pos = posOptions.pos;
	  options.vel = Util.randomVec(Asteroid.LENGTH);
	  options.color = Asteroid.COLOR;
	  options.radius = Asteroid.RADIUS;

	  MovingObject.call(this, options);
	};

	Asteroid.LENGTH = 10;
	Asteroid.COLOR = "#2F3248";
	Asteroid.RADIUS = 50;

	Util.inherits(Asteroid, MovingObject);

	module.exports = Asteroid;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var MovingObject = function (options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	};

	MovingObject.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();

	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2 * Math.PI,
	    false
	  );

	  ctx.fill();
	};

	MovingObject.prototype.move = function () {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	};

	module.exports = MovingObject;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Util = {};

	Util.inherits = function(ChildClass, ParentClass) {
	  var Surrogate = function(){};
	  Surrogate.prototype = ParentClass.prototype;
	  ChildClass.prototype = new Surrogate;
	  ChildClass.prototype.constructor = ChildClass;
	};

	Util.randomVec = function (length) {
	  var x = Math.random() * length;
	  var y = Math.random() * length;
	  return [x, y];
	};

	module.exports = Util;


/***/ }
/******/ ]);