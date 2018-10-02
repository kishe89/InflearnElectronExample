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
  const signInButton = document.getElementById('button-SignIn');
  const signUpButton = document.getElementById('button-SignUp');
  const hidePage = document.getElementById('hide-page');
  signInButton.addEventListener('click',()=>{
    console.log('click');
    const id = userIdInput.value;
    const password = userPasswordInput.value;
    const parameter = {
      id:id,
      password:password
    };
    console.log(parameter);
    ipcRenderer.send('signInRequest',parameter);
  });
  ipcRenderer.on('signInRequest-Success',(event,message)=>{
    console.log(message);
    alert('로그인 성공');
    ipcRenderer.send('displayWaitDialog',message);
  });
  ipcRenderer.on('signInRequest-Failed',(event,message)=>{
    console.log(message);
    alert(message.statusText);
  });
  ipcRenderer.on('hide-page',(event, message)=>{
    hidePage.classList.toggle('on');
  });
  signUpButton.addEventListener('click',()=>{
    ipcRenderer.send('displaySignUpModal');
  });

})();