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
