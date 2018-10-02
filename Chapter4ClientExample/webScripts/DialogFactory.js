/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */

'use strict';

function DialogFactory(document) {
  if(!(this instanceof DialogFactory)){
    throw new Error('must be created with new keyword');
  }
  const CreateRoomDialog = require('./CreateRoomDialog');
  const LeaveRoomDialog = require('./LeaveRoomDialog');
  const InviteRoomDialog = require('./InviteRoomDialog');
  const FriendMenuDialog = require('./FriendMenuDialog');
  const AddFriendDialog = require('./AddFriendDialog');
  const ListFriendDialog = require('./ListFriendDialog');
  const ListFriendRequestDialog = require('./ListFriendRequestDialog');
  const RefreshTokenDialog = require('./RefreshTokenDialog');
  const createRoomDialog = new CreateRoomDialog(document);
  const leaveRoomDialog = new LeaveRoomDialog(document);
  const inviteRoomDialog = new InviteRoomDialog(document);
  const friendMenuDialog = new FriendMenuDialog(document);
  const addFriendDialog = new AddFriendDialog(document);
  const listFriendDialog = new ListFriendDialog(document);
  const listFriendRequestDialog = new ListFriendRequestDialog(document);
  const refreshTokenDialog = new RefreshTokenDialog(document);
  const getDialog = this.getDialog;

  return {
    getDialog:getDialog,
    createRoomDialog:createRoomDialog,
    leaveRoomDialog:leaveRoomDialog,
    inviteRoomDialog:inviteRoomDialog,
    friendMenuDialog:friendMenuDialog,
    addFriendDialog:addFriendDialog,
    listFriendDialog:listFriendDialog,
    listFriendRequestDialog:listFriendRequestDialog,
    refreshTokenDialog:refreshTokenDialog
  }
}
DialogFactory.prototype.getDialog = function (id) {
  switch (id){
    case 'createRoomDialog':
      return this.createRoomDialog;
    case 'leaveRoomDialog':
      return this.leaveRoomDialog;
    case 'inviteRoomDialog':
      return this.inviteRoomDialog;
    case 'friendMenuDialog':
      return this.friendMenuDialog;
    case 'addFriendDialog':
      return this.addFriendDialog;
    case 'listFriendDialog':
      return this.listFriendDialog;
    case 'listFriendRequestDialog':
      return this.listFriendRequestDialog;
    case 'refreshTokenDialog':
      return this.refreshTokenDialog;
  }
};


module.exports = DialogFactory;