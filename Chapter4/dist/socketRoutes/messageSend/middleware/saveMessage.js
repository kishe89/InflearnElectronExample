/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (message, decodedUser) {
  var Message = require('../../../model/Message');
  var messageObjet = new Message({
    sender: decodedUser._id,
    message: message.message,
    room: message.room
  });
  return messageObjet.save();
};
//# sourceMappingURL=saveMessage.js.map