var Board = require('./snake');
var View = require('./snake-view');
$(function () {
  var b = new Board(10, 10);
  var view = new View(b, $(".game"));

});
