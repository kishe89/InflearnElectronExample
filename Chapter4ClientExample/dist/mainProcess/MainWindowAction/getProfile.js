"use strict";

/**
 * Created by kishe56@gmail.com on 2018. 9. 20.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
module.exports = function (MainEvent, TokenManager, event, message) {
  event.sender.send(MainEvent, TokenManager.getId());
};
//# sourceMappingURL=getProfile.js.map