/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (result,io)=>{
  const user = result.taskResults[0];
  const room = result.taskResults[1];
  io.to(user.socketId).emit('receiveInviteUser',{sender:result.sender,room:room});
  return Promise.resolve(result);
}