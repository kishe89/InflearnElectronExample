/**
 * Created by kishe56@gmail.com on 2018. 9. 13.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (socket, win, TokenManager) {
  var axios = require('axios');
  var httpInstance = axios.create({ baseURL: 'http://electronexampleserver.mybluemix.net' });
  var tokenRequest = function tokenRequest() {
    var token = TokenManager.getToken();
    var id = TokenManager.getId();
    return httpInstance.get('/users/token?id=' + id, { headers: { 'x-access-token': token } });
  };
  win.webContents.send('tokenRefreshing');
  tokenRequest().then(function (response) {
    TokenManager.setToken(response.data.token);
    socket.io.opts.query = { token: TokenManager.getToken() };
    win.webContents.send('tokenRefreshing-Success');
  }).catch(function (e) {
    win.webContents.send('tokenRefreshing-Failure');
  });
};
//# sourceMappingURL=OnTokenRefereshRequired.js.map