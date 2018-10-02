/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (result)=>{
  return new Promise((resolve,reject)=>{
    if(!result.friend){
      return reject(new Error('User Not Found'));
    }
    result.friend.friendReceiveRequests.push(result.User._id);
    result.User.friendRequests.push(result.friend._id);
    result.updateTasks.push(result.friend.save());
    result.updateTasks.push(result.User.save());
    return resolve(result);
  })
};