/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (socket, result) {
  var User = require('../../../model/User');

  var query = {
    _id: result.user._id
  };
  var update = {
    $pull: {
      rooms: result.room._id
    }
  };
  var options = {
    new: true
  };
  return new Promise(function (resolve, reject) {
    User.findOneAndUpdate(query, update, options).then(function (user) {
      result.user = user;
      socket.leave(result.room._id, function (error) {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    }).catch(function (error) {
      return reject(error);
    });
  });
};
//# sourceMappingURL=pullRoomToUser.js.map