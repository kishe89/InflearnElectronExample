/**
 * Created by kishe56@gmail.com on 2018. 7. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

exports.validateParameter = function (req, res, next) {
  var _req$body = req.body,
      id = _req$body.id,
      password = _req$body.password;

  if (!id) {
    var error = new Error("Bad request");
    error.status = 400;
    return next(error);
  } else if (!password) {
    var _error = new Error("Bad request");
    _error.status = 400;
    return next(_error);
  }
  return next();
};
exports.comparePassword = function (req, res, next) {
  var UserModel = require('../../model/User');
  var bcrypt = require('bcrypt');
  var _req$body2 = req.body,
      id = _req$body2.id,
      password = _req$body2.password;

  var OnError = function OnError(error) {
    return next(error);
  };
  var comparePassword = function comparePassword(user) {
    if (!user) {
      var error = new Error('User Not Found');
      error.status = 404;
      return next(error);
    }
    req.SearchUser = user;
    return bcrypt.compare(password, user.password);
  };
  var compareResultResponse = function compareResultResponse(isValid) {
    if (isValid) {
      return next();
    }
    var error = new Error('Invalid password');
    error.status = 401;
    return next(error);
  };
  UserModel.findOne({ id: id }).select({ id: 1, password: 1, CreatedAt: 1 }).then(comparePassword).then(compareResultResponse).catch(OnError);
};
exports.createJsonWebToken = function (req, res, next) {
  var jsonwebtoken = require('jsonwebtoken');
  var options = {
    algorithm: "HS256",
    expiresIn: "6000",
    issuer: "http://127.0.0.1"
  };
  var cert = "secret";
  var plainObject = req.SearchUser.toObject({ getters: true });
  jsonwebtoken.sign(plainObject, cert, options, function (err, token) {
    if (err) {
      return next(err);
    }
    req.CreatedToken = token;
    return next();
  });
};
exports.updateUserWithToken = function (req, res, next) {
  var OnError = function OnError(error) {
    return next(error);
  };

  var updateResultResponse = function updateResultResponse(updatedUser) {
    req.SearchUser = updatedUser;
    return next();
  };
  req.SearchUser.set({ token: req.CreatedToken });
  req.SearchUser.save().then(updateResultResponse).catch(OnError);
};
exports.responseToUser = function (req, res, next) {
  res.json({ token: req.CreatedToken });
};
//# sourceMappingURL=login.js.map