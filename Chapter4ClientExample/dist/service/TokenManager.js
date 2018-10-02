/**
 * Created by kishe56@gmail.com on 2018. 9. 13.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function TokenManager() {

  if (!(this instanceof TokenManager)) {
    throw new Error('Must be created with new key word');
  }
  var id = void 0;
  var refreshToken = void 0;
  this.setId = function (userId) {
    id = userId;
  };
  this.getId = function () {
    return id;
  };
  this.getToken = function () {
    return refreshToken;
  };
  this.setToken = function (token) {
    refreshToken = token;
  };
}

module.exports = TokenManager;
//# sourceMappingURL=TokenManager.js.map