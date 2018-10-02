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
var mongoose = require('mongoose');
var Initializer = require('./init/Initializer');
var User = require('./model/User');
var jsonwebtoken = require('jsonwebtoken');
var app = express();
Initializer.InitMongoDB(process.env, mongoose);
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
app.use(function (req, res, next) {
  next(createError(404));
});

io.use(function (socket, next) {
  var token = socket.handshake.query.token;
  var cert = "secret";
  console.log('token is ' + token);
  jsonwebtoken.verify(token, cert, function (err, decodedUser) {
    if (err) {
      err.name === 'TokenExpiredError' ? next(new Error('TokenRefresh')) : next(new Error('Unauthorized'));
      return;
    }
    User.findOne({ id: decodedUser.id }).then(function (user) {
      if (!user) {
        return next(new Error('Unauthorized'));
      }
      user.token === token ? next() : next(new Error('Unauthorized'));
      return;
    }).catch(function (error) {
      return next(new Error('Unauthorized'));
    });
  });
});
io.on('connection', function (socket) {
  socket.on('hello', function (message) {
    console.log(message);
  });
  socket.on('disconnect', function (err) {
    console.log(err);
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
//# sourceMappingURL=app.js.map