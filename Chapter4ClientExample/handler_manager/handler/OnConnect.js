/**
 * Created by kishe56@gmail.com on 2018. 7. 3.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (socket,win)=>{
  const SocketEvent = require('../event/SocketEvent');
  console.log(`socket connected. socket id is ${socket.id}`);
  socket.emit(SocketEvent.HELLO,{message:'Hello Server'});
  win.webContents.send(SocketEvent.HELLO,{message:'Hello Renderer Process'});
};