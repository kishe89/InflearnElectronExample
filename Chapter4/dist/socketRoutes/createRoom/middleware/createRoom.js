/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (decodedUser, message) {
  var Room = require('../../../model/Room');
  var room = new Room({
    roomName: message.roomName
  });

  room.participants.push(decodedUser._id);
  return new Promise(function (resolve, reject) {
    room.save().then(function (room) {
      return resolve({ user: decodedUser, room: room });
    }).catch(function (error) {
      return reject(error);
    });
  });
};
//# sourceMappingURL=createRoom.js.map