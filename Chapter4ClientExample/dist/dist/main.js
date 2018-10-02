/**
 * Created by kishe56@gmail.com on 2018. 6. 28.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

var electron = require('electron');
var app = electron.app,
    BrowserWindow = electron.BrowserWindow,
    ipcMain = electron.ipcMain;

var url = require('url');
var path = require('path');
var io = require('socket.io-client');
var axios = require('axios');
var httpInstance = axios.create({
  baseURL: 'http://electronexampleserver.mybluemix.net'
});

var handler_manager = require('./handler_manager');
var SocketService = require('./service/SocketService');
var SocketEvent = require('./handler_manager/event/SocketEvent');
var TokenManager = require('./service/TokenManager');
var tokenManager = new TokenManager();
var MainWindowActions = require('./mainProcess/MainWindowActions');

var win = void 0;
var socket = void 0;
var modal = void 0;
var waitDialog = void 0;
var listener = void 0;
var errorListener = void 0;
var locale = void 0;

var displayLoginWindow = function displayLoginWindow(event, message) {
  var _electron$screen$getP = electron.screen.getPrimaryDisplay().workAreaSize,
      width = _electron$screen$getP.width,
      height = _electron$screen$getP.height;

  var options = {
    width: width,
    height: height,
    resizable: false,
    fullscreenable: false,
    show: false,
    webPreferences: {
      affinity: true,
      nodeIntegration: true
    }
  };
  win = new BrowserWindow(options);
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'login.html'),
    protocol: 'file',
    slashes: true
  }));
  win.webContents.openDevTools();
  win.once('ready-to-show', function () {
    console.log('ready-to-show');
    win.show();
  });
  win.on('closed', function () {
    console.log('window closed');
    win = null;
    app.quit();
  });
};
var displaySignUpModal = function displaySignUpModal(event, message) {
  win.webContents.send('hide-page');
  modal = new BrowserWindow({ parent: win, modal: true, show: false });

  modal.loadURL(url.format({
    pathname: path.join(__dirname, 'SignUpModal.html'),
    protocol: 'file:'
  }));
  modal.once('ready-to-show', function () {
    modal.show();
  });
  modal.on('closed', function () {
    modal = null;
  });
};
var destroySignUpModal = function destroySignUpModal(event, message) {
  win.webContents.send('hide-page');
  modal.close();
};
var createSignUpRequest = function createSignUpRequest(event, message) {
  httpInstance.post('/users', message).then(function (response) {
    event.sender.send('signUpRequest-Success', response.data);
  }).catch(function (error) {
    var result = {
      status: error.response.status,
      statusText: error.response.statusText
    };
    event.sender.send('signUpRequest-Failed', result);
  });
};
var displayWaitDialog = function displayWaitDialog(event, message) {
  var options = {
    width: 800,
    height: 800,
    resizable: false,
    fullscreenable: false,
    show: false,
    frame: false,
    webPreferences: {
      affinity: true,
      nodeIntegration: true
    }
  };
  waitDialog = new BrowserWindow(options);
  waitDialog.loadURL(url.format({
    pathname: path.join(__dirname, 'WaitDialog.html'),
    protocol: 'file',
    slashes: true
  }));
  waitDialog.once('ready-to-show', function () {
    win.hide();
    waitDialog.show();
    var socketURL = 'ws://electronexampleserver.mybluemix.net';
    var socketOptions = {
      transports: ['websocket'],
      forceNew: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
      query: {
        id: tokenManager.getId(),
        token: message.data.token
      }
    };
    socket = SocketService.createSocket(io, socketURL, socketOptions);
    tokenManager.setToken(message.data.token);
    listener = SocketService.addHandler(socket, waitDialog, handler_manager[SocketEvent.CONNECT]);
    errorListener = SocketService.addHandlerWithTokenManager(socket, waitDialog, handler_manager[SocketEvent.ERROR], tokenManager);
    MainWindowActions(ipcMain, socket, tokenManager);
  });
  waitDialog.on('closed', function () {
    waitDialog = null;
  });
};
var destroyWaitDialog = function destroyWaitDialog(event, message) {
  socket.removeListener('connect', listener);
  socket.removeListener('error', errorListener);
  win.webContents.clearHistory();
  win.setResizable(true);
  win.setFullScreenable(true);
  win.setMinimumSize(600, 600);
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'main.html'),
    protocol: 'file:',
    slashes: true
  }));
  win.once('ready-to-show', function () {
    SocketService.addHandlers(socket, win, handler_manager);
    SocketService.addHandler(socket, win, handler_manager[SocketEvent.CONNECT]);
    SocketService.addHandlerWithTokenManager(socket, win, handler_manager[SocketEvent.RECONNECT_ATTEMPT], tokenManager);
    SocketService.addHandlerWithTokenManager(socket, win, handler_manager[SocketEvent.DISCONNECT], tokenManager);
    SocketService.addHandlerWithTokenManager(socket, win, handler_manager[SocketEvent.TOKENREFRESHREQUIRED], tokenManager);
    SocketService.addHandlerWithTokenManager(socket, win, handler_manager[SocketEvent.BROADCAST_MESSAGE], tokenManager);
    SocketService.addHandlerWithTokenManager(socket, win, handler_manager[SocketEvent.RECEIVE_INVITEUSER], tokenManager);
    SocketService.addHandlerWithTokenManager(socket, win, handler_manager[SocketEvent.ERROR], tokenManager);
    waitDialog.close();
    locale = app.getLocale();
    win.webContents.send('getProfile', { name: tokenManager.getId(), locale: locale });
    win.show();
  });
};
app.on('ready', displayLoginWindow);
ipcMain.on('displayWaitDialog', displayWaitDialog);
ipcMain.on('destroyWaitDialog', destroyWaitDialog);
ipcMain.on('displaySignUpModal', displaySignUpModal);
ipcMain.on('destroySignUpModal', destroySignUpModal);
ipcMain.on('signUpRequest', createSignUpRequest);
ipcMain.on('signInRequest', function (event, message) {
  httpInstance.post('/users/login', message).then(function (response) {
    tokenManager.setId(message.id);
    event.sender.send('signInRequest-Success', response);
  }).catch(function (error) {
    var result = {
      status: error.response.status,
      statusText: error.response.statusText
    };
    event.sender.send('signInRequest-Failed', result);
  });
});

app.on('window-all-closed', function () {
  app.quit();
});
app.on('activate', function () {
  app.quit();
});
//# sourceMappingURL=main.js.map
//# sourceMappingURL=main.js.map