/**
 * Created by kishe56@gmail.com on 2018. 9. 20.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (ipcMain, socket, TokenManager) {
  var emit = require('./MainWindowAction/emit');
  var getProfile = require('./MainWindowAction/getProfile');
  var MainEvent = require('./MainEvent');

  ipcMain.on(MainEvent.roomListSearch, function (event, message) {
    emit(MainEvent.roomListSearch, socket, TokenManager, event, message);
  });
  ipcMain.on(MainEvent.createRoom, function (event, message) {
    emit(MainEvent.createRoom, socket, TokenManager, event, message);
  });
  ipcMain.on(MainEvent.leaveRoom, function (event, message) {
    emit(MainEvent.leaveRoom, socket, TokenManager, event, message);
  });
  ipcMain.on(MainEvent.joinRoomRequest, function (event, message) {
    emit(MainEvent.joinRoomRequest, socket, TokenManager, event, message);
  });
  ipcMain.on(MainEvent.InviteUser, function (event, message) {
    emit(MainEvent.InviteUser, socket, TokenManager, event, message);
  });
  ipcMain.on(MainEvent.searchUser, function (event, message) {
    emit(MainEvent.searchUser, socket, TokenManager, event, message);
  });
  ipcMain.on(MainEvent.getProfile, function (event, message) {
    getProfile(MainEvent.getProfile, TokenManager, event, message);
  });

  ipcMain.on(MainEvent.searchFriend, function (event, message) {
    emit(MainEvent.searchFriend, socket, TokenManager, event, message);
  });
  ipcMain.on(MainEvent.requestFrienShipUser, function (event, message) {
    emit(MainEvent.requestFrienShipUser, socket, TokenManager, event, message);
  });
  ipcMain.on(MainEvent.acceptFriendShipRequest, function (event, message) {
    emit(MainEvent.acceptFriendShipRequest, socket, TokenManager, event, message);
  });
  ipcMain.on(MainEvent.denyFriendShipRequest, function (event, message) {
    emit(MainEvent.denyFriendShipRequest, socket, TokenManager, event, message);
  });
  ipcMain.on(MainEvent.removeFriendShipRequest, function (event, message) {
    emit(MainEvent.removeFriendShipRequest, socket, TokenManager, event, message);
  });
  ipcMain.on(MainEvent.searchFriendRequest, function (event, message) {
    emit(MainEvent.searchFriendRequest, socket, TokenManager, event, message);
  });
  ipcMain.on(MainEvent.messageSend, function (event, message) {
    emit(MainEvent.messageSend, socket, TokenManager, event, message);
  });
  ipcMain.on(MainEvent.messageLoad, function (event, message) {
    emit(MainEvent.messageLoad, socket, TokenManager, event, message);
  });
  ipcMain.on(MainEvent.receiveMessage, function (event, message) {
    emit(MainEvent.receiveMessage, socket, TokenManager, event, message);
  });
  ipcMain.on(MainEvent.receiveInviteUser, function (event, message) {
    emit(MainEvent.receiveMessage, socket, TokenManager, event, message);
  });
};
//# sourceMappingURL=MainWindowActions.js.map
//# sourceMappingURL=MainWindowActions.js.map