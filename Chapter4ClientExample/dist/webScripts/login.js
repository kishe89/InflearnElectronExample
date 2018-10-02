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
  var signInButton = document.getElementById('button-SignIn');
  var signUpButton = document.getElementById('button-SignUp');
  var hidePage = document.getElementById('hide-page');
  signInButton.addEventListener('click', function () {
    console.log('click');
    var id = userIdInput.value;
    var password = userPasswordInput.value;
    var parameter = {
      id: id,
      password: password
    };
    console.log(parameter);
    ipcRenderer.send('signInRequest', parameter);
  });
  ipcRenderer.on('signInRequest-Success', function (event, message) {
    console.log(message);
    alert('로그인 성공');
    ipcRenderer.send('displayWaitDialog', message);
  });
  ipcRenderer.on('signInRequest-Failed', function (event, message) {
    console.log(message);
    alert(message.statusText);
  });
  ipcRenderer.on('hide-page', function (event, message) {
    hidePage.classList.toggle('on');
  });
  signUpButton.addEventListener('click', function () {
    ipcRenderer.send('displaySignUpModal');
  });
})();
//# sourceMappingURL=login.js.map