/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function MessageInputView(document) {
  if(!(this instanceof MessageInputView)){
    throw new Error('must be created with new keyword');
  }
  const Button = require('./Button');
  this.view = document.getElementById('chatAreaInputWrapper');
  this.textArea = document.getElementById('messageTextArea');
  this.sendButton = new Button(document.getElementById('sendMessageButton'));
}

MessageInputView.prototype.getMessage = function () {
  const text = this.textArea.value;
  return text;
};
MessageInputView.prototype.clearMessage = function () {
  this.textArea.value = this.textArea.defaultValue;
};

MessageInputView.prototype.setSendEventListener = function (listener) {
  this.sendButton.setEventListener(listener);
};
MessageInputView.prototype.keyDownEventHandler = function (event) {
  if(event.keyCode === 229){
    return;
  }
  switch (event.key){
    case 'Enter':event.shiftKey===true?this.onShiftEnter():this.onEnter(event);
    break;
  }
};
MessageInputView.prototype.onEnter = function (event) {
  event.preventDefault();
  const clickEvent = new Event('click');
  this.sendButton.view.dispatchEvent(clickEvent);
};
MessageInputView.prototype.onShiftEnter = function () {

};

module.exports = MessageInputView;