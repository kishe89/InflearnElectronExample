/**
 * Created by kishe56@gmail.com on 2018. 9. 20.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (decodedUser) {
  var User = require('../../../model/User');
  return new Promise(function (resolve, reject) {
    User.findOne({ _id: decodedUser._id }).populate('friendReceiveRequests').then(function (user) {
      if (!user) return reject(new Error('User Not Found'));
      return resolve(user);
    }).catch(function (error) {
      return reject(error);
    });
  });
};
//# sourceMappingURL=findFriendRequests.js.map