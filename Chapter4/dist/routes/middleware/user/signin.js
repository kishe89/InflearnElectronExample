/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

exports.createUser = function (req, res, next) {
  var UserModel = require('../../../model/User');
  var bcrypt = require('bcrypt');
  var _req$body = req.body,
      id = _req$body.id,
      password = _req$body.password;


  console.log(req.body);
  if (!id) {
    var error = new Error("Bad Request");
    error.status = 400;
    return next(error);
  } else if (!password) {
    var _error = new Error("Bad Request");
    _error.status = 400;
    return next(_error);
  }
  var generateStrictPassword = function generateStrictPassword(salt) {
    return bcrypt.hash(password, salt);
  };
  var createUser = function createUser(strictPassword) {
    var User = new UserModel({
      id: id,
      password: strictPassword
    });
    req.CreatedUser = User;
    next();
  };
  var OnError = function OnError(error) {
    return next(error);
  };
  bcrypt.genSalt(13).then(generateStrictPassword).then(createUser).catch(OnError);
};

exports.saveUser = function (req, res, next) {

  var OnError = function OnError(error) {
    return next(error);
  };
  req.CreatedUser.save().then(function (user) {
    req.CreatedUser = user;
    return next();
  }).catch(OnError);
};
exports.responseToUser = function (req, res, next) {
  res.json(req.CreatedUser);
};
//# sourceMappingURL=signin.js.map