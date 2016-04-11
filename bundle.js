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

	var GameView = __webpack_require__(1);
	var Game = __webpack_require__(2);

	var canvasEl = document.getElementById("game-canvas");
	canvasEl.width = Game.DIM_X;
	canvasEl.height = Game.DIM_Y;

	var ctx = canvasEl.getContext("2d");

	// console.log(canvasEl);

	var game = new Game;

	var gameView = new GameView(game, ctx);

	gameView.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(2);

	var GameView = function(game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	};

	GameView.prototype.start = function () {
	  setInterval(function () {
	    this.game.moveObjects();
	    this.game.draw(this.ctx);
	  }.bind(this), 20);
	};

	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Asteroid = __webpack_require__(3);

	var Game = function () {
	  this.asteroids = [];
	  this.addAsteroids();
	};

	Game.prototype.addAsteroids  = function() {
	  for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
	    var asteroid = new Asteroid({ pos: this.randomPosition(), game: this });
	    this.asteroids.push(asteroid);
	  }
	};

	Game.prototype.randomPosition = function(){
	  var x = Math.random() * Game.DIM_X;
	  var y = Math.random() * Game.DIM_Y;
	  return [x, y];
	};

	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

	  this.asteroids.forEach(function (asteroid) {
	    asteroid.draw(ctx);
	  });
	};

	Game.prototype.moveObjects = function() {
	  this.asteroids.forEach(function (asteroid) {
	    asteroid.move();
	  });
	};

	Game.prototype.wrap = function (pos) {
	  var x = pos[0];
	  var y = pos[1];

	  if (x >= 1000) {
	    x = 0;
	    y = 1000 - y;
	  } else if (x <= 0) {
	    x = 1000;
	    y = 1000 - y;
	  }

	  if (y >= 1000) {
	    y = 0;
	    x = 1000 - x;
	  } else if (y <= 0) {
	    y = 1000;
	    x = 1000 - x;
	  }

	  return [x, y];
	};

	Game.DIM_X = 1000;
	Game.DIM_Y = 1000;
	Game.NUM_ASTEROIDS = 15;

	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(4);
	var Util = __webpack_require__(5);

	var Asteroid = function(posOptions){
	  var options = {};
	  options.pos = posOptions.pos;
	  options.vel = Util.randomVec(Asteroid.LENGTH);
	  options.color = Asteroid.COLOR;
	  options.radius = Asteroid.RADIUS;
	  options.game = posOptions.game;
	  MovingObject.call(this, options);
	};

	Asteroid.LENGTH = 10;
	Asteroid.COLOR = "#2F3248";
	Asteroid.RADIUS = 10;

	Util.inherits(Asteroid, MovingObject);

	module.exports = Asteroid;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var MovingObject = function (options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	  this.game = options.game;
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
	  this.pos = this.game.wrap(this.pos);
	  // console.log(this.pos);
	};

	MovingObject.prototype.distance = function (otherObject) {
	  var x1 = this.pos[0];
	  var x2 = otherObject.pos[0];
	  var y1 = this.pos[1];
	  var y2 = otherObject.pos[1];

	  return Math.sqrt( Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2) );
	};

	MovingObject.prototype.isCollideWith = function (otherObject) {
	  var sumRadii = this.radius + otherObject.radius;
	  var distance = this.distance(otherObject);

	  return sumRadii >= distance;
	};


	module.exports = MovingObject;


/***/ },
/* 5 */
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