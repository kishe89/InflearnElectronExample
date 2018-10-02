/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (socket, io, event) {
  var Verfier = require('../../util/Verifier');
  var JWTVerifier = new Verfier();
  var findTargetUser = require('./middleware/findTargetUser');
  var pushUserToRoom = require('./middleware/pushUserToRoom');
  var sendMessageToTargetUser = require('./middleware/sendMessageToTargetUser');
  var sendSuccessAck = require('./middleware/sendSuccessAck');
  var sendFailureAck = require('./middleware/sendFailureAck');
  socket.on(event, function (message, ack) {

    JWTVerifier.verify(socket, message.token).then(function (decodedUser) {
      return findTargetUser(decodedUser, message);
    }).then(function (result) {
      return pushUserToRoom(result, message);
    }).then(function (result) {
      return sendMessageToTargetUser(result, io);
    }).then(function (result) {
      return sendSuccessAck(result, message, ack);
    }).catch(function (error) {
      return sendFailureAck(error, message, ack);
    });
  });
};
//# sourceMappingURL=index.js.map