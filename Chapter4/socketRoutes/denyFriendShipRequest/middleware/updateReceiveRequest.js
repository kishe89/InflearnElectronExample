/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (decodedUser,message)=>{
  const User = require('../../../model/User');

  const query = {
    _id:decodedUser._id
  };
  const update = {
    $pull:{
      friendReceiveRequests:message._id
    }
  };
  const options = {
    new : true
  };
  return User.findOneAndUpdate(query,update,options).exec();
};