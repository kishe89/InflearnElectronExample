/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function ListFriendDialog(document) {
  if(!(this instanceof ListFriendDialog)){
    throw new Error('must be created with new keyword');
  }
  const Button = require('./Button');
  const MessageItemFactory = require('./MessageItemFactory');
  this.view = document.getElementById('listFriendDialogWrapper');
  this.items = document.getElementById('friendList');
  this.ItemFactory = new MessageItemFactory(document);
  this.CloseButton = new Button(document.getElementById('listCancelButton'));
  this.eventListener = undefined;
}

ListFriendDialog.prototype.show = function () {
  this.view.classList.toggle('show');
  return Promise.resolve();
};
ListFriendDialog.prototype.dismiss = function () {
  this.view.classList.toggle('show');
};

ListFriendDialog.prototype.setSelectListener = function (listener) {
  if(this.eventListener){
    this.items.removeEventListener('click',this.eventListener);
  }
  this.eventListener = listener;
  this.items.addEventListener('click',this.eventListener);
};
ListFriendDialog.prototype.setCloseListener = function (listener) {
  this.CloseButton.setEventListener(listener);
};
ListFriendDialog.prototype.addItem = function (message) {
  /**
   * @TODO addItem
   */
  const messageItem = this.ItemFactory.createFriendItem(message);
  this.items.appendChild(messageItem);

};
ListFriendDialog.prototype.removeAllItem = function () {
  /**
   * @TODO remove All Item
   */
  const items = this.items;
  return new Promise((resolve,reject)=>{
    if(!items)return reject();
    while(items.firstChild){
      items.removeChild(items.lastChild);
    }
    resolve();
  });
};
ListFriendDialog.prototype.excuteLoader = function (id) {
  /**
   * @TODO excute Loader
   */
  const items = this.items;
  return new Promise((resolve,reject)=>{
    let isExcute = false;
    items.childNodes.forEach(function (element) {
      if(element.id===id){
        isExcute=true;
        element.lastChild.classList.toggle('show');
      }
    })
    isExcute === true?resolve():reject();
  });
};
ListFriendDialog.prototype.removeItem = function (id) {
  /**
   * @TODO remove Item
   */
  this.items.childNodes.forEach(function (element) {
    if(element.id===id){
      element.remove()
    }
  },this);
};

module.exports = ListFriendDialog;