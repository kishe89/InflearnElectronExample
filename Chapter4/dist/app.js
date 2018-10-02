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
var Room = require('./model/Room');
var Message = require('./model/Message');
var jsonwebtoken = require('jsonwebtoken');
var SocketRoutes = require('./socketRoutes');
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

io.use(SocketRoutes.handshake);
io.on('connection', function (socket) {
  SocketRoutes.functions.TokenRefreshEmmit(socket);
  SocketRoutes.functions.SetSocketId(socket).then(function (user) {
    SocketRoutes.functions.JoinRooms(user, socket);
  });
  SocketRoutes.createRoom(socket, SocketRoutes.event.createRoom);
  SocketRoutes.hello(socket, SocketRoutes.event.hello);
  SocketRoutes.disconnect(socket, SocketRoutes.event.disconnect);
  SocketRoutes.searchUser(socket, SocketRoutes.event.searchUser);
  SocketRoutes.roomListSearch(socket, SocketRoutes.event.roomListSearch);
  SocketRoutes.InviteUser(socket, io, SocketRoutes.event.InviteUser);
  SocketRoutes.leaveRoom(socket, SocketRoutes.event.leaveRoom);
  SocketRoutes.searchFriend(socket, SocketRoutes.event.searchFriend);
  SocketRoutes.requestFriendShipUser(socket, SocketRoutes.event.requestFriendShipUser);
  SocketRoutes.acceptFriendShipRequest(socket, SocketRoutes.event.acceptFriendShipRequest);
  SocketRoutes.denyFriendShipRequest(socket, SocketRoutes.event.denyFriendShipRequest);
  SocketRoutes.removeFriendShipRequest(socket, SocketRoutes.event.removeFriendShipRequest);
  SocketRoutes.messageSend(io, socket, SocketRoutes.event.messageSend);
  SocketRoutes.messageLoad(socket, SocketRoutes.event.messageLoad);
  SocketRoutes.searchFriendRequest(socket, SocketRoutes.event.searchFriendRequest);
  SocketRoutes.joinRoomRequest(socket, SocketRoutes.event.joinRoomRequest);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
//# sourceMappingURL=app.js.map