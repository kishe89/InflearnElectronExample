/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (result, message) {
  var User = require('../../../model/User');
  return new Promise(function (resolve, reject) {
    result.Task = User.findOne({ id: message.id });
    result.User === undefined ? reject(new Error('User Not Found')) : resolve(result);
  });
};
//# sourceMappingURL=createFindFriendTask.js.map