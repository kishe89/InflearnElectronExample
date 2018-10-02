/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (decodedUser,message)=>{
  const Room = require('../../../model/Room');
  return new Promise((resolve,reject)=>{
    Room.findOne({_id:message._id})
      .then((room)=>{
        return resolve({user:decodedUser,room:room})
      })
      .catch((error)=>{
        return reject(error);
      })
  });
};