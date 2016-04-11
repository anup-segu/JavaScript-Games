(function(){

  if (typeof Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Util = {};

  Asteroids.Util.inherits = function(ChildClass, ParentClass) {
    var Surrogate = function(){};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate;
    ChildClass.prototype.constructor = ChildClass;
  };

  


}());
