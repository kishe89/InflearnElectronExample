/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (socket, event) {
  socket.on(event, function (message) {
    console.log(message);
  });
};
//# sourceMappingURL=index.js.map