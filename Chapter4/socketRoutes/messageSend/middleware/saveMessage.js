/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (message,decodedUser)=>{
  const Message = require('../../../model/Message');
  const messageObjet = new Message({
    sender:decodedUser._id,
    message:message.message,
    room:message.room
  });
  return messageObjet.save();
};