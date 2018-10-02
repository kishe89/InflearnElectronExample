/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function CreateRoomDialog(document) {
  if (!(this instanceof CreateRoomDialog)) {
    throw new Error('must be created with new keyword');
  }
  var Button = require('./Button');
  this.view = document.getElementById('createRoomDialogWrapper');
  this.roomNameInput = document.getElementById('input-roomName');
  this.confirmButton = new Button(document.getElementById('createConfirmButton'));
  this.cancelButton = new Button(document.getElementById('createCancelButton'));
}

CreateRoomDialog.prototype.show = function () {
  this.view.classList.toggle('show');
  return Promise.resolve();
};

CreateRoomDialog.prototype.getRoomName = function () {
  return this.roomNameInput.value;
};

module.exports = CreateRoomDialog;
//# sourceMappingURL=CreateRoomDialog.js.map