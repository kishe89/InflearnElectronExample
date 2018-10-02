/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (socket, event) {
  var Verfier = require('../../util/Verifier');
  var JWTVerifier = new Verfier();
  var findRoom = require('./middleware/findRoom');
  var pullRoomToUser = require('./middleware/pullRoomToUser');
  var sendSuccessAck = require('./middleware/sendSuccessAck');
  var sendFailureAck = require('./middleware/sendFailureAck');
  socket.on(event, function (message, ack) {

    JWTVerifier.verify(socket, message.token).then(function (decodedUser) {
      return findRoom(decodedUser, message);
    }).then(function (result) {
      return pullRoomToUser(socket, result);
    }).then(function (result) {
      return sendSuccessAck(result, message, ack);
    }).catch(function (error) {
      return sendFailureAck(error, message, ack);
    });
  });
};
//# sourceMappingURL=index.js.map