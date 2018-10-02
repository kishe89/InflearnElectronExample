/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */

'use strict';

function DialogFactory(document) {
  if (!(this instanceof DialogFactory)) {
    throw new Error('must be created with new keyword');
  }
  var CreateRoomDialog = require('./CreateRoomDialog');
  var LeaveRoomDialog = require('./LeaveRoomDialog');
  var InviteRoomDialog = require('./InviteRoomDialog');
  var FriendMenuDialog = require('./FriendMenuDialog');
  var AddFriendDialog = require('./AddFriendDialog');
  var ListFriendDialog = require('./ListFriendDialog');
  var ListFriendRequestDialog = require('./ListFriendRequestDialog');
  var RefreshTokenDialog = require('./RefreshTokenDialog');
  var createRoomDialog = new CreateRoomDialog(document);
  var leaveRoomDialog = new LeaveRoomDialog(document);
  var inviteRoomDialog = new InviteRoomDialog(document);
  var friendMenuDialog = new FriendMenuDialog(document);
  var addFriendDialog = new AddFriendDialog(document);
  var listFriendDialog = new ListFriendDialog(document);
  var listFriendRequestDialog = new ListFriendRequestDialog(document);
  var refreshTokenDialog = new RefreshTokenDialog(document);
  var getDialog = this.getDialog;

  return {
    getDialog: getDialog,
    createRoomDialog: createRoomDialog,
    leaveRoomDialog: leaveRoomDialog,
    inviteRoomDialog: inviteRoomDialog,
    friendMenuDialog: friendMenuDialog,
    addFriendDialog: addFriendDialog,
    listFriendDialog: listFriendDialog,
    listFriendRequestDialog: listFriendRequestDialog,
    refreshTokenDialog: refreshTokenDialog
  };
}
DialogFactory.prototype.getDialog = function (id) {
  switch (id) {
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
//# sourceMappingURL=DialogFactory.js.map