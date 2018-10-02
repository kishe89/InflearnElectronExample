/**
 * Created by kishe56@gmail.com on 2018. 7. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

exports.validateParameter = function (req, res, next) {
  var token = req.headers['x-access-token'];
  var id = req.query.id;
  if (!token) {
    var error = new Error('Bad Request');
    error.status = 400;
    return next(error);
  }
  if (!id) {
    var _error = new Error('Bad Request');
    _error.status = 400;
    return next(_error);
  }

  return next();
};

exports.verifyToken = function (req, res, next) {
  var jsonwebtoken = require('jsonwebtoken');
  var token = req.headers['x-access-token'];
  var cert = "secret";
  jsonwebtoken.verify(token, cert, function (err, decodedUser) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return next();
      } else {
        return next(new Error('Unauthorized'));
      }
    }
    res.json({ token: token });
  });
};
exports.findUser = function (req, res, next) {

  var User = require('../../model/User');
  var id = req.query.id;
  var setUser = function setUser(user) {
    if (!user) {
      var error = new Error('User Not Found');
      error.status = 404;
      return next(error);
    }
    req.SearchUser = user;
    return next();
  };
  var OnError = function OnError(error) {
    return next(error);
  };
  User.findOne({ id: id }).select({ id: 1, password: 1, CreatedAt: 1 }).then(setUser).catch(OnError);
};
exports.createToken = function (req, res, next) {
  var jsonwebtoken = require('jsonwebtoken');
  var options = {
    algorithm: "HS256",
    expiresIn: "60000",
    issuer: "http://127.0.0.1"
  };
  var cert = "secret";
  var plainObject = req.SearchUser.toObject({ getters: true });
  jsonwebtoken.sign(plainObject, cert, options, function (err, token) {
    if (err) {
      return next(err);
    }
    req.refreshedToken = token;
    req.SearchUser.set({ token: token });
    req.SearchUser.save().then(function () {
      return next();
    }).catch(function (err) {
      return next(err);
    });
  });
};
exports.responseToUser = function (req, res, next) {
  console.log('refreshed : ' + req.refreshedToken);
  res.json({ token: req.refreshedToken });
};
//# sourceMappingURL=token.js.map