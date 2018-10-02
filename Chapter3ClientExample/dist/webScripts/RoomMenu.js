/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function RoomMenu(document) {
  if (!(this instanceof RoomMenu)) {
    throw Error('must be created with new keyword');
  }
  this.view = document.getElementById('roomMenu');
  this.eventListener = undefined;
}

RoomMenu.prototype.setSelectListener = function (listener) {
  if (this.eventListener) {
    this.view.removeEventListener('click', this.eventListener);
  }
  this.eventListener = listener;
  this.view.addEventListener('click', this.eventListener);
};

module.exports = RoomMenu;
//# sourceMappingURL=RoomMenu.js.map