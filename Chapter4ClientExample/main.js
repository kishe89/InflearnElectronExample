/**
 * Created by kishe56@gmail.com on 2018. 6. 28.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

const electron = require('electron');
const {app,BrowserWindow,ipcMain} = electron;
const url = require('url');
const path = require('path');
const io = require('socket.io-client');
const axios = require('axios');
const httpInstance = axios.create({
  baseURL:'http://electronexampleserver.mybluemix.net'
});

const handler_manager = require('./handler_manager');
const SocketService = require('./service/SocketService');
const SocketEvent = require('./handler_manager/event/SocketEvent');
const TokenManager = require('./service/TokenManager');
const tokenManager = new TokenManager();
const MainWindowActions = require('./mainProcess/MainWindowActions');

let win;
let socket;
let modal;
let waitDialog;
let listener;
let errorListener;
let locale;

const displayLoginWindow = (event, message)=>{
  const {width,height} = electron.screen.getPrimaryDisplay().workAreaSize;
  const options = {
    width:width,
    height:height,
    resizable:false,
    fullscreenable:false,
    show:false,
    webPreferences:{
      affinity:true,
      nodeIntegration:true
    }
  };
  win = new BrowserWindow(options);
  win.loadURL(url.format({
    pathname:path.join(__dirname,'login.html'),
    protocol:'file',
    slashes:true
  }));
  win.webContents.openDevTools();
  win.once('ready-to-show',()=>{
    console.log('ready-to-show');
    win.show();
  });
  win.on('closed',()=>{
    console.log('window closed');
    win = null;
    app.quit();
  });
};
const displaySignUpModal = (event,message)=>{
  win.webContents.send('hide-page');
  modal = new BrowserWindow({parent:win,modal:true,show:false});

  modal.loadURL(url.format({
    pathname:path.join(__dirname,'SignUpModal.html'),
    protocol:'file:'
  }));
  modal.once('ready-to-show',()=>{
    modal.show();
  });
  modal.on('closed',()=>{
    modal = null;
  });
};
const destroySignUpModal = (event,message)=>{
  win.webContents.send('hide-page');
  modal.close();
};
const createSignUpRequest = (event, message)=>{
  httpInstance.post('/users',message)
    .then((response)=>{
      event.sender.send('signUpRequest-Success',response.data);
    })
    .catch((error)=>{
      const result = {
        status:error.response.status,
        statusText:error.response.statusText
      };
      event.sender.send('signUpRequest-Failed',result);
    })
};
const displayWaitDialog = (event, message)=>{
  const options = {
    width:800,
    height:800,
    resizable:false,
    fullscreenable:false,
    show:false,
    frame:false,
    webPreferences:{
      affinity:true,
      nodeIntegration:true
    }
  };
  waitDialog = new BrowserWindow(options);
  waitDialog.loadURL(url.format({
    pathname:path.join(__dirname,'WaitDialog.html'),
    protocol:'file',
    slashes:true
  }));
  waitDialog.once('ready-to-show',()=>{
    win.hide();
    waitDialog.show();
    const socketURL = 'ws://electronexampleserver.mybluemix.net';
    const socketOptions = {
      transports:['websocket'],
      forceNew:true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax : 5000,
      reconnectionAttempts: Infinity,
      query:{
        id:tokenManager.getId(),
        token:message.data.token
      }
    };
    socket = SocketService.createSocket(io,socketURL,socketOptions);
    tokenManager.setToken(message.data.token);
    listener = SocketService.addHandler(socket,waitDialog,handler_manager[SocketEvent.CONNECT]);
    errorListener = SocketService.addHandlerWithTokenManager(socket,waitDialog,handler_manager[SocketEvent.ERROR],tokenManager);
    MainWindowActions(ipcMain,socket,tokenManager);
  });
  waitDialog.on('closed',()=>{
    waitDialog = null;
  });
};
const destroyWaitDialog = (event, message)=>{
  socket.removeListener('connect',listener);
  socket.removeListener('error',errorListener);
  win.webContents.clearHistory();
  win.setResizable(true);
  win.setFullScreenable(true);
  win.setMinimumSize(600,600);
  win.loadURL(url.format({
    pathname:path.join(__dirname,'main.html'),
    protocol:'file:',
    slashes:true
  }));
  win.once('ready-to-show',()=>{
    SocketService.addHandlers(socket,win,handler_manager);
    SocketService.addHandler(socket,win,handler_manager[SocketEvent.CONNECT]);
    SocketService.addHandlerWithTokenManager(socket,win,handler_manager[SocketEvent.RECONNECT_ATTEMPT],tokenManager);
    SocketService.addHandlerWithTokenManager(socket,win,handler_manager[SocketEvent.DISCONNECT],tokenManager);
    SocketService.addHandlerWithTokenManager(socket,win,handler_manager[SocketEvent.TOKENREFRESHREQUIRED],tokenManager);
    SocketService.addHandlerWithTokenManager(socket,win,handler_manager[SocketEvent.BROADCAST_MESSAGE],tokenManager);
    SocketService.addHandlerWithTokenManager(socket,win,handler_manager[SocketEvent.RECEIVE_INVITEUSER],tokenManager);
    SocketService.addHandlerWithTokenManager(socket,win,handler_manager[SocketEvent.ERROR],tokenManager);
    waitDialog.close();
    locale = app.getLocale();
    win.webContents.send('getProfile',{name:tokenManager.getId(),locale:locale});
    win.show();
  });
};
app.on('ready',displayLoginWindow);
ipcMain.on('displayWaitDialog',displayWaitDialog);
ipcMain.on('destroyWaitDialog',destroyWaitDialog);
ipcMain.on('displaySignUpModal',displaySignUpModal);
ipcMain.on('destroySignUpModal',destroySignUpModal);
ipcMain.on('signUpRequest',createSignUpRequest);
ipcMain.on('signInRequest',(event,message)=>{
  httpInstance.post('/users/login',message)
    .then((response)=>{
      tokenManager.setId(message.id);
      event.sender.send('signInRequest-Success',response);
    })
    .catch((error)=>{
      const result = {
        status:error.response.status,
        statusText:error.response.statusText
      };
      event.sender.send('signInRequest-Failed',result);
    })
});


app.on('window-all-closed',()=>{
  app.quit();
});
app.on('activate',()=>{
  app.quit();
});