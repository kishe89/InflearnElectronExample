/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (messageObject) {
  console.log(messageObject);
  var Room = require('../../../model/Room');
  var query = {
    _id: messageObject.room
  };
  var update = {
    $push: {
      messages: messageObject._id
    }
  };
  var options = {
    new: true
  };
  return new Promise(function (resolve, reject) {
    Room.findOneAndUpdate(query, update, options).exec().then(function () {
      return resolve(messageObject);
    }).catch(function (error) {
      return reject(error);
    });
  });
};
//# sourceMappingURL=pushMessageToRoom.js.map