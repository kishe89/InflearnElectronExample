/**
 * Created by kishe56@gmail.com on 2018. 9. 20.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (message,socket)=>{
  return new Promise((resolve,reject)=>{
    if(!message)return reject(new Error('Invalid Message'));
    socket.join(message.room._id);
    return resolve(message);
  });
};