/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (decodedUser) {
  var User = require('../../../model/User');
  return User.findOne({ _id: decodedUser._id }).populate('friends');
};
//# sourceMappingURL=findFriends.js.map