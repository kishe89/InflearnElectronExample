/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function LeaveRoomDialog(document) {
  if (!(this instanceof LeaveRoomDialog)) {
    throw new Error('must be created with new keyword');
  }
  var Button = require('./Button');
  this.view = document.getElementById('leaveRoomDialogWrapper');
  this.confirmButton = new Button(document.getElementById('leaveConfirmButton'));
  this.cancelButton = new Button(document.getElementById('leaveCancelButton'));
}

LeaveRoomDialog.prototype.show = function () {
  this.view.classList.toggle('show');
  return Promise.resolve();
};

module.exports = LeaveRoomDialog;
//# sourceMappingURL=LeaveRoomDialog.js.map