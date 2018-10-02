/**
 * Created by kishe56@gmail.com on 2018. 9. 20.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (mainEvent, socket, TokenManager, event, message) {
  var SuccessString = '-Success';
  var FailureString = '-Failure';
  message.token = TokenManager.getToken();
  socket.emit(mainEvent, message, function (result) {
    console.log(mainEvent + ' result is ' + result + ' \n isSuccess : ' + result.isSuccess);
    result.isSuccess === true ? event.sender.send(mainEvent + SuccessString, result) : event.sender.send(mainEvent + FailureString, result);
  });
};
//# sourceMappingURL=emit.js.map
//# sourceMappingURL=emit.js.map