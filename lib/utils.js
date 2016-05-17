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
