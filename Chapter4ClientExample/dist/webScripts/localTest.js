'use strict';

/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
var Test = require('./test');

var test1 = new Test(0);
var test2 = new Test(1);

console.log(test1.getA());
test1.addA();
test1.addA();
console.log(test1.getA());

console.log(test2.getB());
test2.addB();
console.log(test2.b);
console.log(test1.b);
//# sourceMappingURL=localTest.js.map