/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (socket) {
  if (socket.isExistNewToken) {
    socket.emit('tokenRefresh-Required');
  }
  return true;
};
//# sourceMappingURL=TokenRefreshEmmit.js.map