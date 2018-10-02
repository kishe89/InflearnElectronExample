/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (result, message) {
  var Room = require('../../../model/Room');
  var Task = [];
  if (!result.targetUser) return Promise.reject(new Error('User Not Found'));
  var query = {
    _id: message.roomId
  };
  var update = {
    $push: {
      participants: result.targetUser._id
    }
  };
  var options = {
    new: true
  };
  result.targetUser.rooms.push(message.roomId);
  Task.push(result.targetUser.save());
  Task.push(Room.findOneAndUpdate(query, update, options).exec());
  return new Promise(function (resolve, reject) {
    Promise.all(Task).then(function (taskResults) {
      result.taskResults = taskResults;
      return resolve(result);
    }).catch(function (errors) {
      return reject(errors);
    });
  });
};
//# sourceMappingURL=pushUserToRoom.js.map