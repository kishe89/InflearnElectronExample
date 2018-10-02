/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (decodedUser, message) {
  var Room = require('../../../model/Room');
  return new Promise(function (resolve, reject) {
    Room.findOne({ _id: message._id }).then(function (room) {
      return resolve({ user: decodedUser, room: room });
    }).catch(function (error) {
      return reject(error);
    });
  });
};
//# sourceMappingURL=findRoom.js.map