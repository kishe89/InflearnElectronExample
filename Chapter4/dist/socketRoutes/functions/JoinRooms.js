/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (User, socket) {
  User.rooms.forEach(function (room) {
    socket.join(room._id);
  });
};
//# sourceMappingURL=JoinRooms.js.map