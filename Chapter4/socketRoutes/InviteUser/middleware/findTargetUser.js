/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (decodedUser,message)=>{
  const User = require('../../../model/User');
  return new Promise((resolve,reject)=>{
    User.findOne({id:message.id})
      .then((user)=>{
        return resolve({targetUser:user,sender:decodedUser});
      })
      .catch((error)=>{
        return reject(error);
      })
  });
};