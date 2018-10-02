/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (User,socket)=>{
  User.rooms.forEach((room)=>{
    socket.join(room._id);
  });
};