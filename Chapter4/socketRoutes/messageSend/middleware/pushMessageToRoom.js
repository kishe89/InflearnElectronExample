/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (messageObject)=>{
  console.log(messageObject);
  const Room = require('../../../model/Room');
  const query = {
    _id:messageObject.room
  };
  const update = {
    $push:{
      messages:messageObject._id
    }
  };
  const options = {
    new : true
  };
  return new Promise((resolve,reject)=>{
    Room.findOneAndUpdate(query,update,options).exec()
      .then(()=>{
        return resolve(messageObject);
      })
      .catch((error)=>{
        return reject(error);
      })
  });
};