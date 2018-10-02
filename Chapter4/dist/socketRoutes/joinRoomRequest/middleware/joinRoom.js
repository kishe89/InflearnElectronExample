/**
 * Created by kishe56@gmail.com on 2018. 9. 20.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (message, socket) {
  return new Promise(function (resolve, reject) {
    if (!message) return reject(new Error('Invalid Message'));
    socket.join(message.room._id);
    return resolve(message);
  });
};
//# sourceMappingURL=joinRoom.js.map