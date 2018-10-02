/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (socket, event) {
  var Verfier = require('../../util/Verifier');
  var JWTVerifier = new Verfier();
  var findUser = require('./middleware/findUser');
  var createFindFriendTask = require('./middleware/createFindFriendTask');
  var excuteFindFriendTask = require('./middleware/excuteFindFriendTask');
  var createFriendShipTask = require('./middleware/createFriendShipTask');
  var excuteFriendShipTask = require('./middleware/excuteFriendShipTask');
  var sendSuccessAck = require('./middleware/sendSuccessAck');
  var sendFailureAck = require('./middleware/sendFailureAck');
  socket.on(event, function (message, ack) {

    JWTVerifier.verify(socket, message.token).then(function (decodedUser) {
      return findUser(decodedUser);
    }).then(function (result) {
      return createFindFriendTask(result, message);
    }).then(function (result) {
      return excuteFindFriendTask(result);
    }).then(function (result) {
      return createFriendShipTask(result);
    }).then(function (result) {
      return excuteFriendShipTask(result);
    }).then(function (result) {
      return sendSuccessAck(result, message, ack);
    }).catch(function (error) {
      return sendFailureAck(error, message, ack);
    });
  });
};
//# sourceMappingURL=index.js.map