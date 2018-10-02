'use strict';

/**
 * Created by kishe56@gmail.com on 2018. 7. 3.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */

module.exports = function (socket) {
  var socketEvent = require('../event/SocketEvent');
  console.log('socket is connected. socket id is ' + socket.id);
  socket.emit(socketEvent.HELLO, { message: 'Hello Server' });
};
//# sourceMappingURL=OnConnect.js.map