/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (socket)=>{
  const User = require('../../model/User');
  const update = {
    $set:{
      socketId:socket.id
    }
  };
  const options = {
    new:true
  };
  return User.findOneAndUpdate({id:socket.handshake.query.id},update,options).populate('rooms');
};