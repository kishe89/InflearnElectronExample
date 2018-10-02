/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (result) {
  return new Promise(function (resolve, reject) {
    result.Task.then(function (friend) {
      result.friend = friend;
      return resolve(result);
    }).catch(function (error) {
      return reject(error);
    });
  });
};
//# sourceMappingURL=excuteFindFriendTask.js.map