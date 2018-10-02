/**
 * Created by kishe56@gmail.com on 2018. 7. 4.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

exports.createSocket = function (io, socketURL, socketOptions) {
  return io(socketURL, socketOptions);
};

exports.addHandlers = function (socket, win, handlerManager) {
  var listeners = [];
  handlerManager.forEach(function (handler) {
    var callback = handler.handler.bind(null, socket, win);
    listeners.push(callback);
    socket.on(handler.event, callback);
  });
  return listeners;
};
exports.addHandler = function (socket, win, handler) {
  var listener = handler.handler.bind(null, socket, win);
  socket.on(handler.event, listener);
  return listener;
};
//# sourceMappingURL=SocketService.js.map