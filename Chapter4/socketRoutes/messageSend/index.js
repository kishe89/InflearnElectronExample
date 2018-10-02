/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (io,socket,event)=>{
  const Verfier = require('../../util/Verifier');
  const JWTVerifier = new Verfier();
  const saveMessage = require('./middleware/saveMessage');
  const populateMessage = require('./middleware/populateMessage');
  const pushMessageToRoom = require('./middleware/pushMessageToRoom');
  const broadcastMessage = require('./middleware/broadcastMessage');
  const sendSuccessAck = require('./middleware/sendSuccessAck');
  const sendFailureAck = require('./middleware/sendFailureAck');
  socket.on(event,(message,ack)=>{
    console.log(event);
    JWTVerifier.verify(socket,message.token)
      .then((decodedUser)=>{
        return saveMessage(message,decodedUser);
      })
      .then((messageObject)=>{
        return populateMessage(messageObject);
      })
      .then((messageObject)=>{
        return pushMessageToRoom(messageObject);
      })
      .then((messageObject)=>{
        return broadcastMessage(messageObject,socket);
      })
      .then((messageObject)=>{
        return sendSuccessAck(messageObject,message,ack);
      })
      .catch((error)=>{
        return sendFailureAck(error,message,ack);
      })
  });
};