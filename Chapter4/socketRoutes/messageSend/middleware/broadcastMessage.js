/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (messageObject,socket)=>{
  console.log(messageObject);

  socket.in(messageObject.room).emit('broadcastMessage',messageObject);
  return Promise.resolve(messageObject);
};