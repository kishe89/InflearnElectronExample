'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var io = require('socket.io')();
var headerPrinter = require('./headerPrinter');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var User = require('./model/User');
var jsonwebtoken = require('jsonwebtoken');
var Verifier = require('./util/Verifier');
var JWTVerifier = new Verifier();
var app = express();
app.io = io;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(headerPrinter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// catch 404 and forward to error handler
io.use(function (socket, next) {
  console.log('handshake');
  var token = socket.handshake.query.token;
  var cert = "secret";
  console.log('token is ' + token);
  jsonwebtoken.verify(token, cert, function (err, decodedUser) {
    if (err) {
      // err.name==='TokenExpiredError'?next(new Error('TokenRefresh')):next(new Error('Unauthorized'));
      if (err.name === 'TokenExpiredError') {
        socket.isExistNewToken = true;
        return next();
      } else {
        return next(new Error('Unauthorized'));
      }
      return;
    }
    User.findOne({ id: decodedUser.id }).then(function (user) {
      if (!user) {
        return next(new Error('Unauthorized'));
      }
      console.log(user.token === token);
      user.token === token ? next() : next(new Error('Unauthorized'));
      return;
    }).catch(function (error) {
      return next(new Error('Unauthorized'));
    });
  });
});
io.on('connection', function (socket) {
  console.log('connect' + socket.id);
  console.log('isExist new token ?' + socket.isExistNewToken);
  if (socket.isExistNewToken) {
    socket.emit('tokenRefresh-Required');
  }
  socket.on('hello', function (message) {
    console.log(message);
  });
  socket.on('disconnect', function (err) {
    console.log(err);
  });
  socket.on('createRoom', function (message, ack) {

    var findUser = function findUser(decodedUser) {
      return User.findOne({ id: decodedUser.id }).exec();
    };
    var createRoom = function createRoom(user) {
      return new Promise(function (resolve, reject) {
        if (!user) {
          return reject();
        }
      });
    };
    var sendAck = function sendAck(user) {

      console.log(user.token === token);
      user.token === token ? next() : next(new Error('Unauthorized'));
      return;
    };
    JWTVerifier.verify(socket, message.token).then(findUser).then(createRoom).then(sendAck);
  });
  socket.on('searchUser', function (message, ack) {
    var findUser = function findUser() {
      return User.findOne({ id: message.id });
    };
    var sendAck = function sendAck(user) {
      if (!user) {
        var error = new Error('Not Found User');
        message.foundUser = undefined;
        message.isSuccess = false;
        message.Error = error;
        ack(message);
        return;
      }
      message.foundUser = user;
      message.isSuccess = true;
      message.Error = undefined;
      ack(message);
    };
    var sendFailureAck = function sendFailureAck(error) {
      console.log(error);
      message.foundUser = undefined;
      message.isSuccess = false;
      message.Error = error;
      ack(message);
    };
    JWTVerifier.verify(socket, message.token).then(findUser).then(sendAck).catch(sendFailureAck);
  });
  socket.on('requestFriendShipUser', function (message, ack) {
    var lexicalObject = {
      User: undefined,
      friend: undefined,
      Task: undefined,
      updateTasks: []
    };

    var findUser = function findUser(decodedUser) {
      return new Promise(function (resolve, reject) {
        User.findOne({ _id: decodedUser._id }).then(function (user) {
          if (!user) return reject(new Error('User Not Found'));
          return resolve(user);
        }).catch(function (error) {
          return reject(error);
        });
      });
    };
    var createFindFriendTask = function createFindFriendTask(requestUser) {
      return new Promise(function (resolve, reject) {
        lexicalObject.User = requestUser;
        lexicalObject.Task = User.findOne({ id: message.id });
        requestUser === undefined ? reject(new Error('Not Found User')) : resolve(lexicalObject);
      });
    };
    var excuteFindFriendTask = function excuteFindFriendTask(lexicalObject) {
      return lexicalObject.Task;
    };
    var createFriendShipTask = function createFriendShipTask(friend) {
      return new Promise(function (resolve, reject) {
        if (!friend) {
          return reject(new Error('Not Found Friend'));
        }
        friend.friendReceiveRequests.push(lexicalObject.User._id);
        lexicalObject.User.friendRequests.push(friend._id);
        lexicalObject.updateTasks.push(friend.save().exec());
        lexicalObject.updateTasks.push(lexicalObject.User.save().exec());
        return resolve(lexicalObject);
      });
    };
    var excuteFriendShipTask = function excuteFriendShipTask(task) {
      return Promise.all(task.updateTasks);
    };
    var sendSuccessAck = function sendSuccessAck() {
      message.isSuccess = true;
      ack(message);
    };
    var sendFailureAck = function sendFailureAck() {
      message.isSuccess = false;
      ack(message);
    };
    JWTVerifier.verify(socket, message.token).then(findUser).then(createFindFriendTask).then(excuteFindFriendTask).then(createFriendShipTask).then(excuteFriendShipTask).then(sendSuccessAck).catch(sendFailureAck);
  });
  socket.on('reconnectSuccess', function (message) {
    console.log('reconnect with ' + message.message);
  });
});

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
//# sourceMappingURL=app.js.map