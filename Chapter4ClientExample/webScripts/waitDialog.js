/**
 * Created by kishe56@gmail.com on 2018. 7. 4.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

(()=>{
  const electron = require('electron');
  const ipcRenderer = electron.ipcRenderer;
  ipcRenderer.on('hello',(event,args)=>{
    event.sender.send('destroyWaitDialog');
  });
})();