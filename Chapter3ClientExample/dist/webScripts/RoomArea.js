/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function RoomArea(document) {
  if (!(this instanceof RoomArea)) {
    throw new Error('must be created with new keyword');
  }
  var Button = require('./Button');
  var RoomList = require('./RoomList');
  var Profile = require('./Profile');
  this.RoomList = new RoomList(document);
  this.Profile = new Profile(document);
  this.FriendMenuButton = new Button(document.getElementById('openFriendMenuButton'));
  this.CreateRoomButton = new Button(document.getElementById('createRoomButton'));
}

module.exports = RoomArea;
//# sourceMappingURL=RoomArea.js.map