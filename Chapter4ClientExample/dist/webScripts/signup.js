/**
 * Created by kishe56@gmail.com on 2018. 7. 4.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

(function () {
  var electron = require('electron');
  var ipcRenderer = electron.ipcRenderer;
  var userIdInput = document.getElementById('user-id-input');
  var userPasswordInput = document.getElementById('user-password-input');
  var SignUpButton = document.getElementById('button-SignUp');
  var CancelButton = document.getElementById('button-Cancel');
  SignUpButton.addEventListener('click', function () {
    console.log('button-Cancel');
    ipcRenderer.send('SignUpModalDestroy');
  });
  CancelButton.addEventListener('click', function () {
    console.log('button-Cancel');
    ipcRenderer.send('SignUpModalDestroy');
  });
})();
//# sourceMappingURL=signup.js.map