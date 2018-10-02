/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';


exports.createUser = (req,res,next)=>{
  const UserModel = require('../../../model/User');
  const bcrypt = require('bcrypt');
  const {id,password} = req.body;

  console.log(req.body);
  if(!id){
    const error = new Error("Bad Request");
    error.status = 400;
    return next(error);

  }else if(!password){
    const error = new Error("Bad Request");
    error.status = 400;
    return next(error);
  }
  const generateStrictPassword = (salt)=>{
    return bcrypt.hash(password,salt);
  };
  const createUser = (strictPassword)=>{
    const User = new UserModel({
      id:id,
      password:strictPassword
    });
    req.CreatedUser = User;
    next();
  };
  const OnError = (error)=>{
    return next(error);
  };
  bcrypt.genSalt(13)
    .then(generateStrictPassword)
    .then(createUser)
    .catch(OnError)

};

exports.saveUser = (req,res,next)=>{

  const OnError = (error)=>{
    return next(error);
  };
  req.CreatedUser.save()
    .then((user)=>{
      req.CreatedUser = user;
      return next();
    })
    .catch(OnError)
};
exports.responseToUser = (req,res,next)=>{
  res.json(req.CreatedUser);
};