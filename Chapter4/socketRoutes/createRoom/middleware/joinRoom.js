/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (socket,result)=>{
  socket.join(result.room._id);
  return Promise.resolve(result);
};