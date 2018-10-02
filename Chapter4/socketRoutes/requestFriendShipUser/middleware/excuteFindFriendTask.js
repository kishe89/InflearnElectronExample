/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (result)=>{
  return new Promise((resolve,reject)=>{
      result.Task
        .then((friend)=>{
          result.friend = friend;
          return resolve(result);
        })
        .catch((error)=>{
          return reject(error);
        })
  })
};