/**
 * Created by kishe56@gmail.com on 2018. 7. 4.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

(function () {
  var electron = require('electron');
  var ipcRenderer = electron.ipcRenderer;
  var SocketEvent = require('././handler_manager/event/SocketEvent');
  ipcRenderer.on(SocketEvent.HELLO, function (event, message) {
    console.log(message);
  });
})();
//# sourceMappingURL=main.js.map