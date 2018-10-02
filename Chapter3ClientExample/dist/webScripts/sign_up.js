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
  var userIdInput = document.getElementById('user-id-input');
  var userPasswordInput = document.getElementById('user-password-input');
  var cancelButton = document.getElementById('button-Cancel');
  var signUpButton = document.getElementById('button-SignUp');

  cancelButton.addEventListener('click', function () {
    ipcRenderer.send('destroySignUpModal');
  });
  signUpButton.addEventListener('click', function () {
    console.log('click');
    var id = userIdInput.value;
    var password = userPasswordInput.value;
    var parameter = {
      id: id,
      password: password
    };

    ipcRenderer.send('signUpRequest', parameter);
  });
  ipcRenderer.on('signUpRequest-Success', function (event, message) {
    console.log(message);
    alert('가입성공');
    ipcRenderer.send('destroySignUpModal');
  });
  ipcRenderer.on('signUpRequest-Failed', function (event, message) {
    console.log(message);
    alert(message.statusText);
  });
})();
//# sourceMappingURL=sign_up.js.map