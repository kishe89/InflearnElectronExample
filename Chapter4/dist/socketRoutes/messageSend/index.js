/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (io, socket, event) {
  var Verfier = require('../../util/Verifier');
  var JWTVerifier = new Verfier();
  var saveMessage = require('./middleware/saveMessage');
  var populateMessage = require('./middleware/populateMessage');
  var pushMessageToRoom = require('./middleware/pushMessageToRoom');
  var broadcastMessage = require('./middleware/broadcastMessage');
  var sendSuccessAck = require('./middleware/sendSuccessAck');
  var sendFailureAck = require('./middleware/sendFailureAck');
  socket.on(event, function (message, ack) {
    console.log(event);
    JWTVerifier.verify(socket, message.token).then(function (decodedUser) {
      return saveMessage(message, decodedUser);
    }).then(function (messageObject) {
      return populateMessage(messageObject);
    }).then(function (messageObject) {
      return pushMessageToRoom(messageObject);
    }).then(function (messageObject) {
      return broadcastMessage(messageObject, socket);
    }).then(function (messageObject) {
      return sendSuccessAck(messageObject, message, ack);
    }).catch(function (error) {
      return sendFailureAck(error, message, ack);
    });
  });
};
//# sourceMappingURL=index.js.map