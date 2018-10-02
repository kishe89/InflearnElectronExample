/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (decodedUser, message) {
  var User = require('../../../model/User');
  return new Promise(function (resolve, reject) {
    User.findOne({ id: message.id }).then(function (user) {
      return resolve({ targetUser: user, sender: decodedUser });
    }).catch(function (error) {
      return reject(error);
    });
  });
};
//# sourceMappingURL=findTargetUser.js.map