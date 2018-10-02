/**
 * Created by kishe56@gmail.com on 2018. 9. 13.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (socket, win, TokenManager, message) {
  console.log('broadCast Message');
  win.webContents.send('receiveMessage', message);
};
//# sourceMappingURL=OnBroadcastMessage.js.map