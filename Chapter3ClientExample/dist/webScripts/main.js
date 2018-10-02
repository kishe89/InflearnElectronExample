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
  var DialogFactory = require('././webScripts/DialogFactory');
  var RoomMenuArea = require('././webScripts/RoomMenuArea');
  var RoomArea = require('././webScripts/RoomArea');
  var ChatArea = require('././webScripts/ChatArea');
  var dialogFactory = new DialogFactory(document);
  var roomMenuArea = new RoomMenuArea(document);
  var roomArea = new RoomArea(document);
  var chatArea = new ChatArea(document);
  ipcRenderer.on(SocketEvent.HELLO, function (event, message) {
    console.log(message);
  });
  dialogFactory.getDialog('inviteRoomDialog').confirmButton.setEventListener(function () {
    dialogFactory.getDialog('inviteRoomDialog').show();
  });
  dialogFactory.getDialog('inviteRoomDialog').cancelButton.setEventListener(function () {
    dialogFactory.getDialog('inviteRoomDialog').show();
  });
  dialogFactory.getDialog('leaveRoomDialog').confirmButton.setEventListener(function () {
    dialogFactory.getDialog('leaveRoomDialog').show();
  });
  dialogFactory.getDialog('leaveRoomDialog').cancelButton.setEventListener(function () {
    dialogFactory.getDialog('leaveRoomDialog').show();
  });
  dialogFactory.getDialog('friendMenuDialog').CloseButton.setEventListener(function () {
    dialogFactory.getDialog('friendMenuDialog').show();
  });
  dialogFactory.getDialog('addFriendDialog').confirmButton.setEventListener(function () {
    dialogFactory.getDialog('addFriendDialog').show();
  });
  dialogFactory.getDialog('addFriendDialog').cancelButton.setEventListener(function () {
    dialogFactory.getDialog('addFriendDialog').show();
  });
  dialogFactory.getDialog('listFriendDialog').CloseButton.setEventListener(function () {
    dialogFactory.getDialog('listFriendDialog').show();
  });
  dialogFactory.getDialog('listFriendRequestDialog').CloseButton.setEventListener(function () {
    dialogFactory.getDialog('listFriendRequestDialog').show();
  });
  dialogFactory.getDialog('friendMenuDialog').setSelectListener(function () {
    if (event.target.tagName === 'LI') {
      if (event.target.id === 'addFriend') {
        dialogFactory.getDialog('friendMenuDialog').openDialog(dialogFactory.getDialog('addFriendDialog'), ipcRenderer);
      } else if (event.target.id === 'showFriends') {
        dialogFactory.getDialog('friendMenuDialog').openDialog(dialogFactory.getDialog('listFriendDialog'), ipcRenderer);
      } else {
        dialogFactory.getDialog('friendMenuDialog').openDialog(dialogFactory.getDialog('listFriendRequestDialog'), ipcRenderer);
      }
    }
  });
  dialogFactory.getDialog('createRoomDialog').confirmButton.setEventListener(function () {
    var room = {
      _id: 'n213n4n1324',
      roomName: undefined
    };
    room.roomName = dialogFactory.getDialog('createRoomDialog').getRoomName();
    roomArea.RoomList.addItem(room);
    dialogFactory.getDialog('createRoomDialog').show();
  });
  dialogFactory.getDialog('createRoomDialog').cancelButton.setEventListener(function () {
    dialogFactory.getDialog('createRoomDialog').show();
  });
  roomMenuArea.MenuList.setSelectListener(function () {
    if (event.target.tagName === 'DIV') {
      if (event.target.id === 'inviteRoomButton') {
        dialogFactory.getDialog('inviteRoomDialog').show();
      } else {
        dialogFactory.getDialog('leaveRoomDialog').show();
      }
    }
  });
  roomArea.FriendMenuButton.setEventListener(function () {
    dialogFactory.getDialog('friendMenuDialog').show();
  });
  roomArea.CreateRoomButton.setEventListener(function () {
    dialogFactory.getDialog('createRoomDialog').show();
  });

  chatArea.MessageInputview.setSendEventListener(function () {
    alert(chatArea.MessageInputview.getMessage());
  });
  chatArea.MessageInputview.textArea.addEventListener('keydown', chatArea.MessageInputview.keyDownEventHandler.bind(chatArea.MessageInputview));
})();
//# sourceMappingURL=main.js.map