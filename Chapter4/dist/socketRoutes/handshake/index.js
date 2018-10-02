/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */

'use strict';

module.exports = function (socket, next) {
  var User = require('../../model/User');
  var jsonwebtoken = require('jsonwebtoken');
  var token = socket.handshake.query.token;
  var cert = "secret";
  console.log('token is ' + token);
  jsonwebtoken.verify(token, cert, function (err, decodedUser) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        socket.isExistNewToken = true;
        return next();
      } else {
        return next(new Error('Unauthorized'));
      }
    }
    User.findOne({ id: decodedUser.id }).then(function (user) {
      if (!user) {
        return next(new Error('Unauthorized'));
      }
      user.token === token ? next() : next(new Error('Unauthorized'));
      return;
    }).catch(function (error) {
      return next(new Error('Unauthorized'));
    });
  });
};
//# sourceMappingURL=index.js.map