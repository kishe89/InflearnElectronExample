/**
 * Created by kishe56@gmail.com on 2018. 6. 27.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (req, res, next) {
  console.log(req.headers);
  next();
};
//# sourceMappingURL=headerPrinter.js.map