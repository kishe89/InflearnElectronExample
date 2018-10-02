/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (decodedUser, message) {
  var User = require('../../../model/User');
  var query = {
    _id: decodedUser._id
  };
  var update = {
    $pull: {
      friends: message._id
    }
  };
  var options = {
    new: true
  };
  return User.findOneAndUpdate(query, update, options).exec();
};
//# sourceMappingURL=updateMyFriend.js.map