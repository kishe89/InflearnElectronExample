/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function MessageList(document) {
  if(!(this instanceof MessageList)){
    throw new Error('must be created with new keyword');
  }
  const MessageItemFactory = require('./MessageItemFactory');
  this.item = document.getElementById('messageList');
  this.ItemFactory = new MessageItemFactory(document);
  this.renderTask = [];
  this.TaskCount = 0;
}

MessageList.prototype.addItem = function (message) {
  const messageItem = this.ItemFactory.createItem(message);
  messageItem.id = this.TaskCount;
  messageItem.item.id = this.TaskCount;
  this.TaskCount++;
  this.items.appendChild(messageItem.item);
  this.renderTask.push(messageItem);
  this.scrollToBottom();
  return messageItem;
};
MessageList.prototype.loadItem = function (message) {
  const messageItem = this.ItemFactory.loadItem(message);

  this.items.appendChild(messageItem.item);
  return Promise.resolve();
};

MessageList.prototype.sortList = function (items) {
  return new Promise((resolve,reject)=>{
    if(!items) return reject();
    const list = [].slice.call(items).sort(function (a, b) {
      const aDate = a.getElementsByClassName('messageElementDate')[0];
      const bDate = b.getElementsByClassName('messageElementDate')[0];
      return aDate.innerText > bDate.innerText? 1:-1
    });
    resolve(list);
  });
};

MessageList.prototype.updateList = function (items) {
  const messageList = this.items;
  items.forEach((element)=>{
    messageList.appendChild(element);
    this.scrollToBottom();
  });
};
MessageList.prototype.chageSuccessStatus = function (message) {
  for(let index = 0; index < this.renderTask.length; index++){
    if(this.renderTask[index].id === message.itme.id){
      this.ItemFactory.changeSuccessStatusMessage(this.renderTask[index],message.result);
      this.renderTask.splice(index,1);
      this.TaskCount--;
      this.sortList(this.items.childNodes)
        .then(this.updateList.bind(this))
        .catch((e)=>{
          console.log(e);
        })
    }
  }
};
MessageList.prototype.chageFailureStatus = function (message, listener) {
  for(let index =0 ; indxe<this.renderTask.length; index){
    if(this.renderTask[index].id === message.itme.id){
      this.ItemFactory.chageFailureStatusMessage(this.renderTask[index],message.result,listener);
      return;
    }
  }
};
MessageList.prototype.clearItems = function () {
  const items = this.items;
  return new Promise((resolve,reject)=>{
    if(!items) return reject();
    while(items.firstChild){
      items.removeChild(items.lastChild);
    }
    resolve();
  });
};

MessageList.prototype.scrollToBottom = function () {
  this.items.scrollTop = this.items.scrollHeight;
};

module.exports = MessageList;