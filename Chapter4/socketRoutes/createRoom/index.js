/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (socket,event)=>{
  const Verifier = require('../../util/Verifier');
  const JWTVerifier = new Verifier();

  const createRoom = require('./middleware/createRoom');
  const pushRoomToUser = require('./middleware/pushRoomToUser');
  const joinRoom = require('./middleware/joinRoom');
  const sendSuccessAck = require('./middleware/sendSuccessAck');
  const sendFailureAck = require('./middleware/sendFailureAck');
  socket.on(event,(message,ack)=>{
    JWTVerifier.verify(socket,message.token)
      .then((decodedUser)=>{
        return createRoom(decodedUser,message);
      })
      .then((result)=>{
        return pushRoomToUser(result);
      })
      .then((result)=>{
        return joinRoom(socket,result);
      })
      .then((result)=>{
        return sendSuccessAck(result,message,ack);
      })
      .catch((error)=>{
        return sendFailureAck(error,message,ack);
      })
  });
}