/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function RoomMenuArea(document) {
  if (!(this instanceof RoomMenuArea)) {
    throw Error('must be created with new keyword');
  }
  var RoomMenu = require('./RoomMenu');
  this.MenuList = new RoomMenu(document);
}

module.exports = RoomMenuArea;
//# sourceMappingURL=RoomMenuArea.js.map