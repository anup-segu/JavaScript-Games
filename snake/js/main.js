var Board = require('./snake');
var View = require('./snake-view');
$(function () {
  var b = new Board(40, 40);
  var view = new View(b, $(".game"));

});
