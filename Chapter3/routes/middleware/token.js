/**
 * Created by kishe56@gmail.com on 2018. 7. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

exports.validateParameter = (req,res,next)=>{
  const token = req.headers['x-access-token'];
  const id = req.query.id;
  if(!token){
    const error = new Error('Bad Request');
    error.status = 400;
    return next(error);
  }
  if(!id){
    const error = new Error('Bad Request');
    error.status = 400;
    return next(error);
  }

  return next();
};

exports.verifyToken = (req,res,next)=>{
  const jsonwebtoken = require('jsonwebtoken');
  const token = req.headers['x-access-token'];
  const cert = "secret";
  jsonwebtoken.verify(token,cert,(err,decodedUser)=>{
    if(err){
      if(err.name==='TokenExpiredError'){
        return next();
      }
      else {
        return next(new Error('Unauthorized'));
      }
    }
    res.json({token:token});
  });
};
exports.findUser = (req,res,next)=>{

  const User = require('../../model/User');
  const id = req.query.id;
  const setUser = (user)=>{
    if(!user){
      const error = new Error('User Not Found');
      error.status = 404;
      return next(error);
    }
    req.SearchUser = user;
    return next();

  };
  const OnError = (error)=>{
    return next(error);
  };
  User.findOne({id:id}).select({id:1,password:1,CreatedAt:1})
    .then(setUser)
    .catch(OnError);
};
exports.createToken = (req,res,next)=>{
  const jsonwebtoken = require('jsonwebtoken');
  const options = {
    algorithm:"HS256",
    expiresIn:"60000",
    issuer:"http://127.0.0.1"
  };
  const cert = "secret";
  const plainObject = req.SearchUser.toObject({getters:true});
  jsonwebtoken.sign(plainObject,cert,options,(err,token)=>{
    if(err){
      return next(err);
    }
    req.refreshedToken = token;
    req.SearchUser.set({token:token});
    req.SearchUser.save()
      .then(()=>{
        return next();
      })
      .catch((err)=>{
        return next(err);
      });
  });
}
exports.responseToUser = (req,res,next)=>{
  console.log('refreshed : '+req.refreshedToken);
  res.json({token:req.refreshedToken});
};