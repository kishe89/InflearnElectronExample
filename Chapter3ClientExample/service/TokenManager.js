/**
 * Created by kishe56@gmail.com on 2018. 9. 13.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function TokenManager() {

  if(!(this instanceof TokenManager)){
    throw new Error('Must be created with new key word');
  }
  let id;
  let refreshToken;
  this.setId = (userId)=>{
    id = userId;
  }
  this.getId = ()=>{
    return id;
  }
  this.getToken = ()=>{
    return refreshToken;
  }
  this.setToken = (token)=>{
    refreshToken = token;
  }
}

module.exports = TokenManager;