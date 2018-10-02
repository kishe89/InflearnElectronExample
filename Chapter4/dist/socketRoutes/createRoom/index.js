/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (socket, event) {
  var Verifier = require('../../util/Verifier');
  var JWTVerifier = new Verifier();

  var createRoom = require('./middleware/createRoom');
  var pushRoomToUser = require('./middleware/pushRoomToUser');
  var joinRoom = require('./middleware/joinRoom');
  var sendSuccessAck = require('./middleware/sendSuccessAck');
  var sendFailureAck = require('./middleware/sendFailureAck');
  socket.on(event, function (message, ack) {
    JWTVerifier.verify(socket, message.token).then(function (decodedUser) {
      return createRoom(decodedUser, message);
    }).then(function (result) {
      return pushRoomToUser(result);
    }).then(function (result) {
      return joinRoom(socket, result);
    }).then(function (result) {
      return sendSuccessAck(result, message, ack);
    }).catch(function (error) {
      return sendFailureAck(error, message, ack);
    });
  });
};
//# sourceMappingURL=index.js.map