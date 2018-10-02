/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function RoomList(document) {
  if (!(this instanceof RoomList)) {
    throw new Error('must be created with new keyword');
  }
  var MessageItemFactory = require('./MessageItemFactory');
  this.items = document.getElementById('roomList');
  this.ItemFactory = new MessageItemFactory(document);
  this.CurrentItem = undefined;
  this.PreviousItem = undefined;
  this.eventListener = undefined;
}

RoomList.prototype.addItem = function (room) {
  var roomitem = this.ItemFactory.createRoomItem(room);
  this.items.appendChild(roomitem);
  return Promise.resolve(roomitem);
};

RoomList.prototype.removeItem = function (room) {
  var items = this.items;
  var RoomList = this.items.childNodes;
  var result = Array.prototype.some.call(RoomList, function (element) {
    if (element.id === room.id) {
      items.removeChild(element);
      return true;
    }
    return false;
  });
  return result;
};
RoomList.prototype.setSelectListener = function (listener) {
  if (this.eventListener) {
    this.items.removeEventListener('click', this.eventListener);
  }
  this.eventListener = listener;
  this.items.addEventListener('click', this.eventListener);
};
RoomList.prototype.setCurrentItem = function (item) {
  if (item.tagName !== 'LI') return false;

  if (this.CurrentItem) {
    if (this.CurrentItem === item) {
      return false;
    }
    this.CurrentItem.classList.toggle('selected');
  }
  this.PreviousItem = this.CurrentItem;
  this.CurrentItem = item;
  this.CurrentItem.classList.toggle('selected');
  return true;
};
RoomList.prototype.FailureClearItem = function (_id) {
  var item = this.getCurrentItem();
  item.classList.toggle('selected');
  this.clearCurrentItem();
};
RoomList.prototype.clearCurrentItem = function () {
  this.CurrentItem = undefined;
};
RoomList.prototype.getCurrentItem = function () {
  return this.CurrentItem;
};

module.exports = RoomList;
//# sourceMappingURL=RoomList.js.map
//# sourceMappingURL=RoomList.js.map