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
  const DialogFactory = require('././webScripts/DialogFactory');
  const RoomMenuArea = require('././webScripts/RoomMenuArea');
  const RoomArea = require('././webScripts/RoomArea');
  const ChatArea = require('././webScripts/ChatArea');
  const MainEvent = require('././mainProcess/MainEvent');
  const dialogFactory = new DialogFactory(document);
  const roomMenuArea = new RoomMenuArea(document);
  const roomArea = new RoomArea(document);
  const chatArea = new ChatArea(document);
  let locale = undefined;
  const successString = '-Success';
  const failureString = '-Failure';
  ipcRenderer.send(MainEvent.roomListSearch,{});
  ipcRenderer.send(MainEvent.getProfile,{});

  ipcRenderer.on(MainEvent.roomListSearch+successString,(event,message)=>{
    console.log(message);
    message.result.forEach((room)=>{
      roomArea.RoomList.addItem(room);
    });
  });
  ipcRenderer.on(MainEvent.roomListSearch+failureString,(event,message)=>{
    alert('방리스트 조회 실패 cmd + r로 다시 시도하세요.');
  });
  roomArea.RoomList.setSelectListener((event)=>{
    const viewAnimation =()=>{
      return new Promise((resolve,reject)=>{
        roomArea.RoomList.setCurrentItem(event.target)===true?resolve():reject();
      })
    };
    const messageLoad = ()=>{
      chatArea.MessageList.clearItems();
      ipcRenderer.send(MainEvent.messageLoad,{_id:event.target.id});
    };
    const notReload = (error)=>{
      console.log(error);
    };
    viewAnimation()
      .then(messageLoad)
      .catch(notReload);
  });
  ipcRenderer.on(MainEvent.messageLoad+successString,(event,message)=>{
    console.log(message);
    chatArea.MessageList.clearItems()
      .then(()=>{
        const currentRoom = roomArea.RoomList.getCurrentItem();
        if(!currentRoom){
          return;
        }
        if(!currentRoom.id){
          return;
        }
        if(currentRoom.id === message._id){
          message.result.forEach((message)=>{
            chatArea.MessageList.loadItem(message);
          });
          chatArea.MessageList.sortList(chatArea.MessageList.items.childNodes);
        }
      })
  });
  ipcRenderer.on(MainEvent.messageLoad+failureString,(event,message)=>{
    console.log(message);
    roomArea.RoomList.FailureClearItem(message._id);
    alert('메시지로드에 실패하셨습니다');
  });
  chatArea.MessageList.setScrollListener((e)=>{
    console.log(e);
  });

  ipcRenderer.on(MainEvent.tokenRefreshing,(event)=>{
    dialogFactory.getDialog('refreshTokenDialog').show();
  });
  ipcRenderer.on(MainEvent.tokenRefreshing+successString,(event)=>{
    dialogFactory.getDialog('refreshTokenDialog').show();
  });
  ipcRenderer.on(MainEvent.tokenRefreshing+failureString,(event)=>{
    dialogFactory.getDialog('refreshTokenDialog').show();
  });
  ipcRenderer.on(MainEvent.getProfile,(event,message)=>{
    roomArea.Profile.setName(message.name);
    locale = message.locale;
    chatArea.MessageList.ItemFactory.setLocale(locale);
  });
  ipcRenderer.on(SocketEvent.HELLO,(event,message)=>{
    console.log(message);
  });
  dialogFactory.getDialog('inviteRoomDialog').confirmButton.setEventListener(()=>{
    const userId = dialogFactory.getDialog('inviteRoomDialog').getUserId();
    const targetRoom = roomArea.RoomList.getCurrentItem().id;
    ipcRenderer.send(MainEvent.InviteUser,{id:userId,roomId:targetRoom});
  });
  ipcRenderer.on(MainEvent.InviteUser+successString,(event,message)=>{
    console.log(message);
    dialogFactory.getDialog('inviteRoomDialog').show();
    alert(`${message.result[0].id} 초대 성공`);

  });
  ipcRenderer.on(MainEvent.InviteUser+failureString,(event,message)=>{
    console.log(message);
    alert(`초대 실패`);
  });

  dialogFactory.getDialog('inviteRoomDialog').cancelButton.setEventListener(()=>{
    dialogFactory.getDialog('inviteRoomDialog').show();
  });
  dialogFactory.getDialog('leaveRoomDialog').confirmButton.setEventListener(()=>{
    const currentRoom = roomArea.RoomList.getCurrentItem();
    ipcRenderer.send(MainEvent.leaveRoom,{_id:currentRoom.id});

    chatArea.MessageList.clearItems();
    dialogFactory.getDialog('leaveRoomDialog').show();
  });
  ipcRenderer.on(MainEvent.leaveRoom+successString,(event,message)=>{
    console.log(message);
    const currentRoom = roomArea.RoomList.getCurrentItem();
    roomArea.RoomList.removeItem(currentRoom);
    roomArea.RoomList.clearCurrentItem();
    alert(message.result.room.roomName+"나가기 성공");
  });
  ipcRenderer.on(MainEvent.leaveRoom+failureString,(event,message)=>{
    alert("나가기 실패");
  });
  dialogFactory.getDialog('leaveRoomDialog').cancelButton.setEventListener(()=>{
    dialogFactory.getDialog('leaveRoomDialog').show();
  });
  dialogFactory.getDialog('friendMenuDialog').CloseButton.setEventListener(()=>{
    dialogFactory.getDialog('friendMenuDialog').show();
  });
  dialogFactory.getDialog('addFriendDialog').confirmButton.setEventListener(()=>{
    const userId = dialogFactory.getDialog('addFriendDialog').getUserId();
    const message = {
      id:userId
    };
    ipcRenderer.send(MainEvent.requestFrienShipUser,message);

  });
  ipcRenderer.on(MainEvent.requestFrienShipUser+successString,(event,message)=>{
    dialogFactory.getDialog('addFriendDialog').show();
    alert(`${message.id} 에게 친구 신청 성공`);
  });
  ipcRenderer.on(MainEvent.requestFrienShipUser+failureString,(event,message)=>{
    alert(`친구 신청 실패`);
  });
  dialogFactory.getDialog('addFriendDialog').searchUserButton.setEventListener(()=>{
    const userId = dialogFactory.getDialog('addFriendDialog').getUserId();
    const message = {
      id:userId
    };
    dialogFactory.getDialog('addFriendDialog').play();
    ipcRenderer.send(MainEvent.searchUser,message);
  });
  ipcRenderer.on(MainEvent.searchUser+successString,(event,message)=>{
    console.log(message);
    dialogFactory.getDialog('addFriendDialog').setSearchResult(message.id);
    dialogFactory.getDialog('addFriendDialog').finish();
  });
  ipcRenderer.on(MainEvent.searchUser+failureString,(event,message)=>{
    console.log(message);
    dialogFactory.getDialog('addFriendDialog').setSearchResult(dialogFactory.getDialog('addFriendDialog').defaultValue);
    dialogFactory.getDialog('addFriendDialog').finish();
  });
  dialogFactory.getDialog('addFriendDialog').cancelButton.setEventListener(()=>{
    dialogFactory.getDialog('addFriendDialog').show();
  });
  dialogFactory.getDialog('listFriendDialog').CloseButton.setEventListener(()=>{
    dialogFactory.getDialog('listFriendDialog').dismiss();
  });
  dialogFactory.getDialog('listFriendDialog').setSelectListener((event)=>{
    if(event.target.tagName === 'BUTTON'){
      const message = {
        _id:event.target.parentNode.id
      };
      dialogFactory.getDialog('listFriendDialog').excuteLoader(message._id)
        .then(()=>{
          ipcRenderer.send(MainEvent.removeFriendShipRequest,message);
        })
        .catch((error)=>{
          console.log(error);
        })
    }
  });
  ipcRenderer.on(MainEvent.removeFriendShipRequest+successString,(event,message)=>{
    console.log(message);
    dialogFactory.getDialog('listFriendDialog').removeItem(message._id);

  });
  ipcRenderer.on(MainEvent.removeFriendShipRequest+failureString,(event,message)=>{
    console.log(message);
    dialogFactory.getDialog('listFriendDialog').excuteLoader(message._id);
    alert('친구 삭제 실패');
  });
  ipcRenderer.on(MainEvent.searchFriend+successString,(event,message)=>{
    console.log(message);
    message.result.friends.forEach((item)=>{
      dialogFactory.getDialog('listFriendDialog').addItem(item);
    });
  });
  ipcRenderer.on(MainEvent.searchFriend+failureString,(event,message)=>{
    console.log(message);
    alert('친구리스트 조회 실패');
  });
  dialogFactory.getDialog('listFriendRequestDialog').CloseButton.setEventListener(()=>{
    dialogFactory.getDialog('listFriendRequestDialog').dismiss();
  });
  dialogFactory.getDialog('listFriendRequestDialog').setSelectListener((event)=>{
    if(event.target.tagName === 'BUTTON'){
      const message = {
        _id:event.target.parentNode.id
      };
      dialogFactory.getDialog('listFriendRequestDialog').excuteLoader(message._id)
        .then(()=>{
          event.target.value==='1'?ipcRenderer.send(MainEvent.acceptFriendShipRequest,message):ipcRenderer.send(MainEvent.denyFriendShipRequest,message);
        })
        .catch((error)=>{
          console.log(error);
        })
    }
  });
  ipcRenderer.on(MainEvent.acceptFriendShipRequest+successString,(event,message)=>{
    dialogFactory.getDialog('listFriendRequestDialog').removeItem(message._id);
    alert(`친구 수락 성공`);
  });
  ipcRenderer.on(MainEvent.acceptFriendShipRequest+failureString,(event,message)=>{
    alert(`친구 수락 실패`);
  });
  ipcRenderer.on(MainEvent.denyFriendShipRequest+successString,(event,message)=>{
    dialogFactory.getDialog('listFriendRequestDialog').removeItem(message._id);
    alert(`친구 거절 성공`);
  });
  ipcRenderer.on(MainEvent.denyFriendShipRequest+failureString,(event,message)=>{
    alert(`친구 거절 실패`);
  });
  ipcRenderer.on(MainEvent.searchFriendRequest+successString,(event,message)=>{
    console.log(message);
    dialogFactory.getDialog('listFriendRequestDialog').removeAllItem()
      .then(()=>{
        message.result.forEach((item)=>{
          dialogFactory.getDialog('listFriendRequestDialog').addItem(item);
        });
      })
      .catch((error)=>{
        console.log(error);
      });
  });
  ipcRenderer.on(MainEvent.searchFriendRequest+failureString,(event,message)=>{
    console.log(message);
    dialogFactory.getDialog('listFriendRequestDialog').removeAllItem();
    alert('친구요청 리스트 조회 실패');
  });
  dialogFactory.getDialog('friendMenuDialog').setSelectListener(()=>{
    if(event.target.tagName === 'LI'){
      if(event.target.id === 'addFriend'){
        dialogFactory.getDialog('friendMenuDialog').openDialog(dialogFactory.getDialog('addFriendDialog'),ipcRenderer);
      }else if(event.target.id === 'showFriends'){
        dialogFactory.getDialog('friendMenuDialog').openDialog(dialogFactory.getDialog('listFriendDialog'),ipcRenderer);
      }else{
        dialogFactory.getDialog('friendMenuDialog').openDialog(dialogFactory.getDialog('listFriendRequestDialog'),ipcRenderer);
      }
    }
  });
  dialogFactory.getDialog('createRoomDialog').confirmButton.setEventListener(()=>{
    ipcRenderer.send(MainEvent.createRoom,{roomName:dialogFactory.getDialog('createRoomDialog').getRoomName()});
  });
  ipcRenderer.on(MainEvent.createRoom+successString,(event,message)=>{
    console.log(message);

    roomArea.RoomList.addItem(message.result.room)
      .then(roomArea.RoomList.setCurrentItem.bind(roomArea.RoomList))
      .then(chatArea.MessageList.clearItems.bind(chatArea.MessageList))
      .then(dialogFactory.getDialog('createRoomDialog').show.bind(dialogFactory.getDialog('createRoomDialog')))
      .catch((error)=>{
        console.log(error);
      });
  });
  ipcRenderer.on(MainEvent.createRoom+failureString,(event,message)=>{
    console.log(message);
  });
  dialogFactory.getDialog('createRoomDialog').cancelButton.setEventListener(()=>{
    dialogFactory.getDialog('createRoomDialog').show();
  });
  roomMenuArea.MenuList.setSelectListener(()=>{
    if(event.target.tagName === 'DIV'){
      if(event.target.id==='inviteRoomButton'){
        dialogFactory.getDialog('inviteRoomDialog').show();
      }else{
        dialogFactory.getDialog('leaveRoomDialog').show();
      }
    }
  });
  roomArea.FriendMenuButton.setEventListener(()=>{
    dialogFactory.getDialog('friendMenuDialog').show();
  });
  roomArea.CreateRoomButton.setEventListener(()=>{
    dialogFactory.getDialog('createRoomDialog').show();
  });

  chatArea.MessageInputview.setSendEventListener(()=>{
    const currentRoom = roomArea.RoomList.getCurrentItem();
    if(!currentRoom)return;
    const message = {
      room:currentRoom.id,
      message:chatArea.MessageInputview.getMessage(),
      sender:{
        id:roomArea.Profile.getName()
      }
    };
    const item = chatArea.MessageList.addItem(message);
    chatArea.MessageInputview.clearMessage();
    message.item = item;
    ipcRenderer.send(MainEvent.messageSend,message);
  });
  ipcRenderer.on(MainEvent.messageSend+successString,(event,message)=>{
    console.log(message);
    chatArea.MessageList.changeSuccessStatus(message);
  });
  ipcRenderer.on(MainEvent.messageSend+failureString,(event,message)=>{
    console.log(message);
    chatArea.MessageList.changeFailureStatus(message,()=>{
      message.retry = true;
      ipcRenderer.send(MainEvent.messageSend,message);
    });
  });
  ipcRenderer.on(MainEvent.receiveMessage,(event,message)=>{
    console.log(message);
    const currentRoom = roomArea.RoomList.getCurrentItem();
    if(!currentRoom){
      chatArea.NotificationList.createNotification(message);
      return;
    }
    if(currentRoom.id === message.room){
      console.log(currentRoom.id);
      console.log(message.room);
      chatArea.MessageList.loadItem(message)
        .then(chatArea.MessageList.sortList.bind(chatArea.MessageList, chatArea.MessageList.items.childNodes))
        .then(chatArea.MessageList.updateList.bind(chatArea.MessageList));
    }else{
      chatArea.NotificationList.createNotification(message);
    }

  });
  chatArea.MessageInputview.textArea.addEventListener('keydown',chatArea.MessageInputview.keyDownEventHandler.bind(chatArea.MessageInputview));
  ipcRenderer.on(MainEvent.receiveInviteUser,(event,message)=>{
    ipcRenderer.send(MainEvent.joinRoomRequest,message);
    roomArea.RoomList.addItem(message.room);
    chatArea.NotificationList.createRoomNotification(message);
  });
  ipcRenderer.on(MainEvent.joinRoomRequest+successString,(event,message)=>{
    console.log(message);
  });
  ipcRenderer.on(MainEvent.joinRoomRequest+failureString,(event,message)=>{
    console.log(message);
  });
})();