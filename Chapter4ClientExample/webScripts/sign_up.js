/**
 * Created by kishe56@gmail.com on 2018. 7. 4.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

(()=>{
  const electron = require('electron');
  const ipcRenderer = electron.ipcRenderer;
  const SocketEvent = require('././handler_manager/event/SocketEvent');
  ipcRenderer.on(SocketEvent.HELLO,(event,message)=>{
    console.log(message);
  });
  const userIdInput = document.getElementById('user-id-input');
  const userPasswordInput = document.getElementById('user-password-input');
  const cancelButton = document.getElementById('button-Cancel');
  const signUpButton = document.getElementById('button-SignUp');

  cancelButton.addEventListener('click',()=>{
    ipcRenderer.send('destroySignUpModal');
  });
  signUpButton.addEventListener('click',()=>{
    console.log('click');
    const id = userIdInput.value;
    const password = userPasswordInput.value;
    const parameter = {
      id:id,
      password:password
    };

    ipcRenderer.send('signUpRequest',parameter);
  });
  ipcRenderer.on('signUpRequest-Success',(event,message)=>{
    console.log(message);
    alert('가입성공');
    ipcRenderer.send('destroySignUpModal');
  });
  ipcRenderer.on('signUpRequest-Failed',(event,message)=>{
    console.log(message);
    alert(message.statusText);
  });
})();