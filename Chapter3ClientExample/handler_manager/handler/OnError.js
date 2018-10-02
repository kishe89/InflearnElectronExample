/**
 * Created by kishe56@gmail.com on 2018. 7. 3.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = (socket, win, TokenManager, err)=>{
  console.log(`socket error is ${err}`);
  const axios = require('axios');
  const httpInstance = axios.create({baseURL:'http://127.0.0.1:3001'});

  const tokenRequest = ()=>{
    const token = TokenManager.getToken();
    const id = TokenManager.getId();
    return httpInstance.get('/users/token?id='+id,{headers:{'x-access-token':token}});
  };

  if(err==='TokenRefresh'){
    tokenRequest()
      .then((response)=>{
        TokenManager.setToken(response.data.token);
        socket.io.opts.query = {token:TokenManager.getToken()};
        win.webContents.send('tokenRefreshing-Success');
      })
      .catch((e)=>{
        win.webContents.send('tokenRefreshing-Failure');
      })
  }else{
    win.webContents.send('RedirectLoginPage');
  }
};