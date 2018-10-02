/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';


module.exports = (socket,io, event)=>{
  const Verfier = require('../../util/Verifier');
  const JWTVerifier = new Verfier();
  const findTargetUser = require('./middleware/findTargetUser');
  const pushUserToRoom = require('./middleware/pushUserToRoom');
  const sendMessageToTargetUser = require('./middleware/sendMessageToTargetUser');
  const sendSuccessAck = require('./middleware/sendSuccessAck');
  const sendFailureAck = require('./middleware/sendFailureAck');
  socket.on(event,(message,ack)=>{

    JWTVerifier.verify(socket,message.token)
      .then((decodedUser)=>{
        return findTargetUser(decodedUser,message);
      })
      .then((result)=>{
        return pushUserToRoom(result,message);
      })
      .then((result)=>{
        return sendMessageToTargetUser(result,io);
      })
      .then((result)=>{
        return sendSuccessAck(result,message,ack);
      })
      .catch((error)=>{
        return sendFailureAck(error,message,ack);
      })
  });
};