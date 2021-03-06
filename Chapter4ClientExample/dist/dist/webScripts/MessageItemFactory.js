/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function MessageItemFactory(document) {
  if (!(this instanceof MessageItemFactory)) {
    throw new Error('must be created with new keyword');
  }
  var moment = require('moment');
  this.document = document;
  this.moment = moment;
  this.utcOffset = moment().utcOffset();
  this.locale = undefined;
}

MessageItemFactory.prototype.setLocale = function (locale) {
  this.locale = locale;
  this.moment.locale(locale);
  return this.locale;
};

MessageItemFactory.prototype.createItem = function (message) {
  var item = this.document.createElement('li');
  var itemDiv = this.document.createElement('div');
  var messageElementProfile = this.document.createElement('p');
  var resendButton = this.document.createElement('div');
  var messageElementDate = this.document.createElement('p');
  var messageContent = this.document.createElement('p');

  item.className = 'messageElement';
  resendButton.className = 'messageElementReSendButton';
  messageElementProfile.className = 'messageElementProfile';
  messageElementDate.className = 'messageElementDate';
  messageContent.className = 'messageContent';

  messageElementProfile.innerText = message.sender.id;
  resendButton.innerText = '재전송';
  messageElementDate.setAttribute('data-value', this.moment.utc(Date.now()).utcOffset(this.utcOffset).format('x'));
  messageElementDate.innerText = this.moment.utc(Date.now()).utcOffset(this.utcOffset).format();
  messageContent.innerText = message.message;

  itemDiv.appendChild(messageElementProfile);
  itemDiv.appendChild(messageElementDate);
  itemDiv.appendChild(resendButton);
  itemDiv.appendChild(messageContent);
  item.appendChild(itemDiv);
  return {
    item: item,
    itemDiv: itemDiv,
    resendButton: resendButton,
    messageElementProfile: messageElementProfile,
    messageElementDate: messageElementDate,
    messageContent: messageContent
  };
};

MessageItemFactory.prototype.loadItem = function (message) {
  var item = this.document.createElement('li');
  var itemDiv = this.document.createElement('div');
  var messageElementProfile = this.document.createElement('p');
  var resendButton = this.document.createElement('div');
  var messageElementDate = this.document.createElement('p');
  var messageContent = this.document.createElement('p');

  item.className = 'messageElement';
  resendButton.className = 'messageElementReSendButton';
  messageElementProfile.className = 'messageElementProfile';
  messageElementDate.className = 'messageElementDate';
  messageContent.className = 'messageContent';

  messageElementProfile.innerText = message.sender.id;
  resendButton.innerText = '재전송';
  messageElementDate.setAttribute('data-value', this.moment.utc(message.CreatedAt).utcOffset(this.utcOffset).format('x'));
  messageElementDate.innerText = this.moment.utc(message.CreatedAt).utcOffset(this.utcOffset).format();
  messageContent.innerText = message.message;

  itemDiv.appendChild(messageElementProfile);
  itemDiv.appendChild(messageElementDate);
  itemDiv.appendChild(resendButton);
  itemDiv.appendChild(messageContent);
  item.appendChild(itemDiv);
  return item;
};

MessageItemFactory.prototype.changeSuccessStatusMessage = function (item, message) {
  var sendRetryValidate = function sendRetryValidate(item) {
    var classes = item.className.split(' ');
    var i = classes.indexOf('show');
    if (i >= 0) item.classList.toggle('show');
  };
  item.item._id = message._id;
  sendRetryValidate(item.resendButton);
  item.messageElementProfile.innerText = message.sender.id;
  item.messageElementDate.setAttribute('data-value', this.moment.utc(message.CreatedAt).utcOffset(this.utcOffset).format('x'));
  item.messageElementDate.innerText = this.moment.utc(message.CreatedAt).utcOffset(this.utcOffset).format();
  item.messageContent.innerText = message.message;
  return item;
};
MessageItemFactory.prototype.changeFailureStatusMessage = function (item, message, listener) {
  item.resendButton.classList.toggle('show');
  item.resendButton.addEventListener('click', listener);
  return item;
};
MessageItemFactory.prototype.createRequestFriendItem = function (message) {
  var item = this.document.createElement('li');
  var requestFriendId = this.document.createElement('p');
  var FriendShipConfirmButton = this.document.createElement('button');
  var FriendShipCancelButton = this.document.createElement('button');
  var elementLoader = this.document.createElement('div');

  item.id = message._id;

  item.className = 'requestElement';
  requestFriendId.className = 'requestFriendId';
  FriendShipConfirmButton.className = 'FriendShipButton';
  FriendShipCancelButton.className = 'FriendShipButton';
  elementLoader.className = 'elementLoader';

  requestFriendId.innerText = message.id;
  FriendShipCancelButton.innerText = '수락';
  FriendShipConfirmButton.value = 1;
  FriendShipCancelButton.innerText = '거절';
  FriendShipCancelButton.value = 0;

  item.appendChild(requestFriendId);
  item.appendChild(FriendShipConfirmButton);
  item.appendChild(FriendShipCancelButton);
  item.appendChild(elementLoader);
  return item;
};

MessageItemFactory.prototype.createFriendItem = function (message) {
  var item = this.document.createElement('li');
  var requestFriendId = this.document.createElement('p');
  var FriendShipCancelButton = this.document.createElement('button');
  var elementLoader = this.document.createElement('div');

  item.id = message._id;

  item.className = 'friendElement';
  requestFriendId.className = 'friendId';
  FriendShipCancelButton.className = 'cancelFriendShipButton';
  elementLoader.className = 'elementLoader';

  requestFriendId.innerText = message.id;
  FriendShipCancelButton.innerText = '친구 삭제';

  item.appendChild(requestFriendId);
  item.appendChild(FriendShipCancelButton);
  item.appendChild(elementLoader);
  return item;
};

MessageItemFactory.prototype.createRoomItem = function (room) {
  var item = this.document.createElement('li');
  item.className = 'roomButton';
  item.id = room._id;
  item.innerText = room.roomName;
  return item;
};

module.exports = MessageItemFactory;
//# sourceMappingURL=MessageItemFactory.js.map
//# sourceMappingURL=MessageItemFactory.js.map