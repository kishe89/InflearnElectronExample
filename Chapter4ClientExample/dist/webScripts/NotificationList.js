/**
 * Created by kishe56@gmail.com on 2018. 9. 20.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function NotificationList() {
  if (!(this instanceof NotificationList)) {
    throw new Error('must be created with new keyword');
  }
}

NotificationList.prototype.createNotification = function (item) {
  return new Promise(function (resolve, reject) {
    var title = item.sender.id;
    var options = {
      body: item.message,
      data: {
        room: item.room,
        sender: item.sender
      }
    };
    item === undefined ? reject() : resolve(new Notification(title, options));
  });
};
NotificationList.prototype.createRoomNotification = function (item) {
  return new Promise(function (resolve, reject) {
    var title = item.sender.id + '\uB2D8\uC774 ' + item.room.roomName + '\uC5D0 \uCD08\uB300\uD558\uC168\uC2B5\uB2C8\uB2E4.';
    var options = {
      body: item.message,
      data: {
        room: item.room,
        sender: item.sender
      }
    };
    item === undefined ? reject() : resolve(new Notification(title, options));
  });
};

module.exports = NotificationList;
//# sourceMappingURL=NotificationList.js.map