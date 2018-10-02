/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (result) {
  var User = require('../../../model/User');
  var query = {
    _id: result.user._id
  };
  var update = {
    $push: {
      rooms: result.room._id
    }
  };
  var options = {
    new: true
  };

  return new Promise(function (resolve, reject) {
    User.findOneAndUpdate(query, update, options).exec().then(function (user) {
      result.user = user;
      return resolve(result);
    }).catch(function (error) {
      return reject(error);
    });
  });
};
//# sourceMappingURL=pushRoomToUser.js.map