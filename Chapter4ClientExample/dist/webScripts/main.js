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
  var MainEvent = require('././mainProcess/MainEvent');
  var dialogFactory = new DialogFactory(document);
  var roomMenuArea = new RoomMenuArea(document);
  var roomArea = new RoomArea(document);
  var chatArea = new ChatArea(document);
  var locale = undefined;
  var successString = '-Success';
  var failureString = '-Failure';
  ipcRenderer.send(MainEvent.roomListSearch, {});
  ipcRenderer.send(MainEvent.getProfile, {});

  ipcRenderer.on(MainEvent.roomListSearch + successString, function (event, message) {
    console.log(message);
    message.result.forEach(function (room) {
      roomArea.RoomList.addItem(room);
    });
  });
  ipcRenderer.on(MainEvent.roomListSearch + failureString, function (event, message) {
    alert('방리스트 조회 실패 cmd + r로 다시 시도하세요.');
  });
  roomArea.RoomList.setSelectListener(function (event) {
    var viewAnimation = function viewAnimation() {
      return new Promise(function (resolve, reject) {
        roomArea.RoomList.setCurrentItem(event.target) === true ? resolve() : reject();
      });
    };
    var messageLoad = function messageLoad() {
      chatArea.MessageList.clearItems();
      ipcRenderer.send(MainEvent.messageLoad, { _id: event.target.id });
    };
    var notReload = function notReload(error) {
      console.log(error);
    };
    viewAnimation().then(messageLoad).catch(notReload);
  });
  ipcRenderer.on(MainEvent.messageLoad + successString, function (event, message) {
    console.log(message);
    chatArea.MessageList.clearItems().then(function () {
      var currentRoom = roomArea.RoomList.getCurrentItem();
      if (!currentRoom) {
        return;
      }
      if (!currentRoom.id) {
        return;
      }
      if (currentRoom.id === message._id) {
        message.result.forEach(function (message) {
          chatArea.MessageList.loadItem(message);
        });
        chatArea.MessageList.sortList(chatArea.MessageList.items.childNodes);
      }
    });
  });
  ipcRenderer.on(MainEvent.messageLoad + failureString, function (event, message) {
    console.log(message);
    roomArea.RoomList.FailureClearItem(message._id);
    alert('메시지로드에 실패하셨습니다');
  });
  chatArea.MessageList.setScrollListener(function (e) {
    console.log(e);
  });

  ipcRenderer.on(MainEvent.tokenRefreshing, function (event) {
    dialogFactory.getDialog('refreshTokenDialog').show();
  });
  ipcRenderer.on(MainEvent.tokenRefreshing + successString, function (event) {
    dialogFactory.getDialog('refreshTokenDialog').show();
  });
  ipcRenderer.on(MainEvent.tokenRefreshing + failureString, function (event) {
    dialogFactory.getDialog('refreshTokenDialog').show();
  });
  ipcRenderer.on(MainEvent.getProfile, function (event, message) {
    roomArea.Profile.setName(message.name);
    locale = message.locale;
    chatArea.MessageList.ItemFactory.setLocale(locale);
  });
  ipcRenderer.on(SocketEvent.HELLO, function (event, message) {
    console.log(message);
  });
  dialogFactory.getDialog('inviteRoomDialog').confirmButton.setEventListener(function () {
    var userId = dialogFactory.getDialog('inviteRoomDialog').getUserId();
    var targetRoom = roomArea.RoomList.getCurrentItem().id;
    ipcRenderer.send(MainEvent.InviteUser, { id: userId, roomId: targetRoom });
  });
  ipcRenderer.on(MainEvent.InviteUser + successString, function (event, message) {
    console.log(message);
    dialogFactory.getDialog('inviteRoomDialog').show();
    alert(message.result[0].id + ' \uCD08\uB300 \uC131\uACF5');
  });
  ipcRenderer.on(MainEvent.InviteUser + failureString, function (event, message) {
    console.log(message);
    alert('\uCD08\uB300 \uC2E4\uD328');
  });

  dialogFactory.getDialog('inviteRoomDialog').cancelButton.setEventListener(function () {
    dialogFactory.getDialog('inviteRoomDialog').show();
  });
  dialogFactory.getDialog('leaveRoomDialog').confirmButton.setEventListener(function () {
    var currentRoom = roomArea.RoomList.getCurrentItem();
    ipcRenderer.send(MainEvent.leaveRoom, { _id: currentRoom.id });

    chatArea.MessageList.clearItems();
    dialogFactory.getDialog('leaveRoomDialog').show();
  });
  ipcRenderer.on(MainEvent.leaveRoom + successString, function (event, message) {
    console.log(message);
    var currentRoom = roomArea.RoomList.getCurrentItem();
    roomArea.RoomList.removeItem(currentRoom);
    roomArea.RoomList.clearCurrentItem();
    alert(message.result.room.roomName + "나가기 성공");
  });
  ipcRenderer.on(MainEvent.leaveRoom + failureString, function (event, message) {
    alert("나가기 실패");
  });
  dialogFactory.getDialog('leaveRoomDialog').cancelButton.setEventListener(function () {
    dialogFactory.getDialog('leaveRoomDialog').show();
  });
  dialogFactory.getDialog('friendMenuDialog').CloseButton.setEventListener(function () {
    dialogFactory.getDialog('friendMenuDialog').show();
  });
  dialogFactory.getDialog('addFriendDialog').confirmButton.setEventListener(function () {
    var userId = dialogFactory.getDialog('addFriendDialog').getUserId();
    var message = {
      id: userId
    };
    ipcRenderer.send(MainEvent.requestFrienShipUser, message);
  });
  ipcRenderer.on(MainEvent.requestFrienShipUser + successString, function (event, message) {
    dialogFactory.getDialog('addFriendDialog').show();
    alert(message.id + ' \uC5D0\uAC8C \uCE5C\uAD6C \uC2E0\uCCAD \uC131\uACF5');
  });
  ipcRenderer.on(MainEvent.requestFrienShipUser + failureString, function (event, message) {
    alert('\uCE5C\uAD6C \uC2E0\uCCAD \uC2E4\uD328');
  });
  dialogFactory.getDialog('addFriendDialog').searchUserButton.setEventListener(function () {
    var userId = dialogFactory.getDialog('addFriendDialog').getUserId();
    var message = {
      id: userId
    };
    dialogFactory.getDialog('addFriendDialog').play();
    ipcRenderer.send(MainEvent.searchUser, message);
  });
  ipcRenderer.on(MainEvent.searchUser + successString, function (event, message) {
    console.log(message);
    dialogFactory.getDialog('addFriendDialog').setSearchResult(message.id);
    dialogFactory.getDialog('addFriendDialog').finish();
  });
  ipcRenderer.on(MainEvent.searchUser + failureString, function (event, message) {
    console.log(message);
    dialogFactory.getDialog('addFriendDialog').setSearchResult(dialogFactory.getDialog('addFriendDialog').defaultValue);
    dialogFactory.getDialog('addFriendDialog').finish();
  });
  dialogFactory.getDialog('addFriendDialog').cancelButton.setEventListener(function () {
    dialogFactory.getDialog('addFriendDialog').show();
  });
  dialogFactory.getDialog('listFriendDialog').CloseButton.setEventListener(function () {
    dialogFactory.getDialog('listFriendDialog').dismiss();
  });
  dialogFactory.getDialog('listFriendDialog').setSelectListener(function (event) {
    if (event.target.tagName === 'BUTTON') {
      var message = {
        _id: event.target.parentNode.id
      };
      dialogFactory.getDialog('listFriendDialog').excuteLoader(message._id).then(function () {
        ipcRenderer.send(MainEvent.removeFriendShipRequest, message);
      }).catch(function (error) {
        console.log(error);
      });
    }
  });
  ipcRenderer.on(MainEvent.removeFriendShipRequest + successString, function (event, message) {
    console.log(message);
    dialogFactory.getDialog('listFriendDialog').removeItem(message._id);
  });
  ipcRenderer.on(MainEvent.removeFriendShipRequest + failureString, function (event, message) {
    console.log(message);
    dialogFactory.getDialog('listFriendDialog').excuteLoader(message._id);
    alert('친구 삭제 실패');
  });
  ipcRenderer.on(MainEvent.searchFriend + successString, function (event, message) {
    console.log(message);
    message.result.friends.forEach(function (item) {
      dialogFactory.getDialog('listFriendDialog').addItem(item);
    });
  });
  ipcRenderer.on(MainEvent.searchFriend + failureString, function (event, message) {
    console.log(message);
    alert('친구리스트 조회 실패');
  });
  dialogFactory.getDialog('listFriendRequestDialog').CloseButton.setEventListener(function () {
    dialogFactory.getDialog('listFriendRequestDialog').dismiss();
  });
  dialogFactory.getDialog('listFriendRequestDialog').setSelectListener(function (event) {
    if (event.target.tagName === 'BUTTON') {
      var message = {
        _id: event.target.parentNode.id
      };
      dialogFactory.getDialog('listFriendRequestDialog').excuteLoader(message._id).then(function () {
        event.target.value === '1' ? ipcRenderer.send(MainEvent.acceptFriendShipRequest, message) : ipcRenderer.send(MainEvent.denyFriendShipRequest, message);
      }).catch(function (error) {
        console.log(error);
      });
    }
  });
  ipcRenderer.on(MainEvent.acceptFriendShipRequest + successString, function (event, message) {
    dialogFactory.getDialog('listFriendRequestDialog').removeItem(message._id);
    alert('\uCE5C\uAD6C \uC218\uB77D \uC131\uACF5');
  });
  ipcRenderer.on(MainEvent.acceptFriendShipRequest + failureString, function (event, message) {
    alert('\uCE5C\uAD6C \uC218\uB77D \uC2E4\uD328');
  });
  ipcRenderer.on(MainEvent.denyFriendShipRequest + successString, function (event, message) {
    dialogFactory.getDialog('listFriendRequestDialog').removeItem(message._id);
    alert('\uCE5C\uAD6C \uAC70\uC808 \uC131\uACF5');
  });
  ipcRenderer.on(MainEvent.denyFriendShipRequest + failureString, function (event, message) {
    alert('\uCE5C\uAD6C \uAC70\uC808 \uC2E4\uD328');
  });
  ipcRenderer.on(MainEvent.searchFriendRequest + successString, function (event, message) {
    console.log(message);
    dialogFactory.getDialog('listFriendRequestDialog').removeAllItem().then(function () {
      message.result.forEach(function (item) {
        dialogFactory.getDialog('listFriendRequestDialog').addItem(item);
      });
    }).catch(function (error) {
      console.log(error);
    });
  });
  ipcRenderer.on(MainEvent.searchFriendRequest + failureString, function (event, message) {
    console.log(message);
    dialogFactory.getDialog('listFriendRequestDialog').removeAllItem();
    alert('친구요청 리스트 조회 실패');
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
    ipcRenderer.send(MainEvent.createRoom, { roomName: dialogFactory.getDialog('createRoomDialog').getRoomName() });
  });
  ipcRenderer.on(MainEvent.createRoom + successString, function (event, message) {
    console.log(message);

    roomArea.RoomList.addItem(message.result.room).then(roomArea.RoomList.setCurrentItem.bind(roomArea.RoomList)).then(chatArea.MessageList.clearItems.bind(chatArea.MessageList)).then(dialogFactory.getDialog('createRoomDialog').show.bind(dialogFactory.getDialog('createRoomDialog'))).catch(function (error) {
      console.log(error);
    });
  });
  ipcRenderer.on(MainEvent.createRoom + failureString, function (event, message) {
    console.log(message);
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
    var currentRoom = roomArea.RoomList.getCurrentItem();
    if (!currentRoom) return;
    var message = {
      room: currentRoom.id,
      message: chatArea.MessageInputview.getMessage(),
      sender: {
        id: roomArea.Profile.getName()
      }
    };
    var item = chatArea.MessageList.addItem(message);
    chatArea.MessageInputview.clearMessage();
    message.item = item;
    ipcRenderer.send(MainEvent.messageSend, message);
  });
  ipcRenderer.on(MainEvent.messageSend + successString, function (event, message) {
    console.log(message);
    chatArea.MessageList.changeSuccessStatus(message);
  });
  ipcRenderer.on(MainEvent.messageSend + failureString, function (event, message) {
    console.log(message);
    chatArea.MessageList.changeFailureStatus(message, function () {
      message.retry = true;
      ipcRenderer.send(MainEvent.messageSend, message);
    });
  });
  ipcRenderer.on(MainEvent.receiveMessage, function (event, message) {
    console.log(message);
    var currentRoom = roomArea.RoomList.getCurrentItem();
    if (!currentRoom) {
      chatArea.NotificationList.createNotification(message);
      return;
    }
    if (currentRoom.id === message.room) {
      console.log(currentRoom.id);
      console.log(message.room);
      chatArea.MessageList.loadItem(message).then(chatArea.MessageList.sortList.bind(chatArea.MessageList, chatArea.MessageList.items.childNodes)).then(chatArea.MessageList.updateList.bind(chatArea.MessageList));
    } else {
      chatArea.NotificationList.createNotification(message);
    }
  });
  chatArea.MessageInputview.textArea.addEventListener('keydown', chatArea.MessageInputview.keyDownEventHandler.bind(chatArea.MessageInputview));
  ipcRenderer.on(MainEvent.receiveInviteUser, function (event, message) {
    ipcRenderer.send(MainEvent.joinRoomRequest, message);
    roomArea.RoomList.addItem(message.room);
    chatArea.NotificationList.createRoomNotification(message);
  });
  ipcRenderer.on(MainEvent.joinRoomRequest + successString, function (event, message) {
    console.log(message);
  });
  ipcRenderer.on(MainEvent.joinRoomRequest + failureString, function (event, message) {
    console.log(message);
  });
})();
//# sourceMappingURL=main.js.map