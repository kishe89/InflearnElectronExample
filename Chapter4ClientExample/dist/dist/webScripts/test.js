"use strict";

/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */

function test(mode) {
  var a = 0;
  var getA = this.getA;
  var addA = this.addA;
  var getB = this.getB;
  var addB = this.addB;
  var b = this.b;
  return {
    a: a,
    b: b,
    getA: getA,
    addA: addA,
    getB: getB,
    addB: addB
  };
}

test.prototype.b = 0;

test.prototype.getA = function () {
  return this.a;
};
test.prototype.addA = function () {
  this.a += 1;
};
test.prototype.getB = function () {
  return this.b;
};
test.prototype.addB = function () {
  this.b += 1;
};

module.exports = test;
//# sourceMappingURL=test.js.map
//# sourceMappingURL=test.js.map