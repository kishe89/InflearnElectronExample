/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (decodedUser,message)=>{
  const Room = require('../../../model/Room');
  const room = new Room({
    roomName:message.roomName
  });

  room.participants.push(decodedUser._id);
  return new Promise((resolve,reject)=>{
    room.save()
      .then((room)=>{
        return resolve({user:decodedUser,room:room});
      })
      .catch((error)=>{
        return reject(error);
      })
  });
};