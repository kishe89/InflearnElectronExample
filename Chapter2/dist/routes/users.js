'use strict';

var express = require('express');
var router = express.Router();
var UserModel = require('../model/User');
var bcrypt = require('bcrypt');
var jsonwebtoken = require('jsonwebtoken');
router.post('/login', function (req, res, next) {
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
});
router.post('/login', function (req, res, next) {
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
});
router.post('/login', function (req, res, next) {
  var options = {
    algorithm: "HS256",
    expiresIn: "10000",
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
});
router.post('/login', function (req, res, next) {
  var OnError = function OnError(error) {
    return next(error);
  };

  var updateResultResponse = function updateResultResponse(updatedUser) {
    req.SearchUser = updatedUser;
    return next();
  };
  req.SearchUser.set({ token: req.CreatedToken });
  req.SearchUser.save().then(updateResultResponse).catch(OnError);
});
router.post('/login', function (req, res, next) {
  res.json({ token: req.CreatedToken });
});

router.post('/', function (req, res, next) {
  var _req$body3 = req.body,
      id = _req$body3.id,
      password = _req$body3.password;


  console.log(req.body);
  if (!id) {
    var error = new Error("Bad Request");
    error.status = 400;
    return next(error);
  } else if (!password) {
    var _error2 = new Error("Bad Request");
    _error2.status = 400;
    return next(_error2);
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
});
router.post('/', function (req, res, next) {

  var OnError = function OnError(error) {
    return next(error);
  };
  req.CreatedUser.save().then(function (user) {
    req.CreatedUser = user;
    return next();
  }).catch(OnError);
});
router.post('/', function (req, res, next) {
  res.json(req.CreatedUser);
});
module.exports = router;
//# sourceMappingURL=users.js.map