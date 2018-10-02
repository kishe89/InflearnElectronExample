/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (result)=>{
  const User = require('../../../model/User');
  const query = {
    _id:result.user._id
  };
  const update = {
    $push:{
      rooms:result.room._id
    }
  };
  const options = {
    new :true
  };

  return new Promise((resolve,reject)=>{
    User.findOneAndUpdate(query,update,options).exec()
      .then((user)=>{
        result.user = user;
        return resolve(result);
      })
      .catch((error)=>{
        return reject(error);
      })
  });
};