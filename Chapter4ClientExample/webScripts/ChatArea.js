/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function ChatArea(document) {
  if(!(this instanceof ChatArea)){
    throw new Error('must be created with new keyword');
  }
  const MessageList = require('./MessageList');
  const MessageInputView = require('./MessageInputView');
  const NotificationList = require('./NotificationList');
  this.MessageList = new MessageList(document);
  this.NotificationList = new NotificationList();
  this.MessageInputview = new MessageInputView(document);

}

module.exports = ChatArea;