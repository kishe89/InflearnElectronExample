/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (error, message, ack) {
  console.log(error);
  message.result = [];
  message.isSuccess = false;
  message.Error = error;
  ack(message);
  return Promise.resolve();
};
//# sourceMappingURL=sendFailureAck.js.map