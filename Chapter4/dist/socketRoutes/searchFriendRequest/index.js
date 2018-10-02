/**
 * Created by kishe56@gmail.com on 2018. 9. 20.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (socket, event) {
  var Verifier = require('../../util/Verifier');
  var JWTVerifier = new Verifier();
  var findFriendRequests = require('./middleware/findFriendRequests');
  var sendSuccessAck = require('./middleware/sendSuccessAck');
  var sendFailureAck = require('./middleware/sendFailureAck');
  socket.on(event, function (message, ack) {
    JWTVerifier.verify(socket, message.token).then(function (decodedUser) {
      return findFriendRequests(decodedUser);
    }).then(function (user) {
      return sendSuccessAck(user, message, ack);
    }).catch(function (error) {
      return sendFailureAck(error, message, ack);
    });
  });
};
//# sourceMappingURL=index.js.map