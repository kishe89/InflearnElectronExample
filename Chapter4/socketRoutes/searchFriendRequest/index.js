/**
 * Created by kishe56@gmail.com on 2018. 9. 20.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (socket,event)=>{
  const Verifier = require('../../util/Verifier');
  const JWTVerifier = new Verifier();
  const findFriendRequests = require('./middleware/findFriendRequests');
  const sendSuccessAck = require('./middleware/sendSuccessAck');
  const sendFailureAck = require('./middleware/sendFailureAck');
  socket.on(event,(message,ack)=>{
    JWTVerifier.verify(socket,message.token)
      .then((decodedUser)=>{
        return findFriendRequests(decodedUser);
      })
      .then((user)=>{
        return sendSuccessAck(user,message,ack)
      })
      .catch((error)=>{
        return sendFailureAck(error,message,ack);
      })
  });
};