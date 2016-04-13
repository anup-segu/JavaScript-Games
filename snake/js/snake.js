var Snake = function () {
  this.direction = "N";
  this.segments = [[0,0],[0,1],[0,2]];
};

Snake.DIRS = {
  "N": [0,1],
  "S": [0,-1],
  "E": [1,0],
  "W": [-1,0]
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
  this.snake.isOver();
};

Array.prototype.plus = function (direction) {
  return [this[0] + direction[0], this[1] + direction[1]];
};

Array.prototype.equals = function (pos) {
  return this[0] === pos[0] && this[1] === pos[1];
};
module.exports = Board;
