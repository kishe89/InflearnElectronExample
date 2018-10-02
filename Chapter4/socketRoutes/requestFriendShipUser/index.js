/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (socket, event)=>{
  const Verfier = require('../../util/Verifier');
  const JWTVerifier = new Verfier();
  const findUser = require('./middleware/findUser');
  const createFindFriendTask = require('./middleware/createFindFriendTask');
  const excuteFindFriendTask = require('./middleware/excuteFindFriendTask');
  const createFriendShipTask = require('./middleware/createFriendShipTask');
  const excuteFriendShipTask = require('./middleware/excuteFriendShipTask');
  const sendSuccessAck = require('./middleware/sendSuccessAck');
  const sendFailureAck = require('./middleware/sendFailureAck');
  socket.on(event,(message,ack)=>{

    JWTVerifier.verify(socket,message.token)
      .then((decodedUser)=>{
        return findUser(decodedUser);
      })
      .then((result)=>{
        return createFindFriendTask(result,message);
      })
      .then((result)=>{
        return excuteFindFriendTask(result);
      })
      .then((result)=>{
        return createFriendShipTask(result);
      })
      .then((result)=>{
        return excuteFriendShipTask(result);
      })
      .then((result)=>{
        return sendSuccessAck(result,message,ack);
      })
      .catch((error)=>{
        return sendFailureAck(error,message,ack);
      })
  });
};