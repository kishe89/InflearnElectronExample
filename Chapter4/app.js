'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const io = require('socket.io')();
const headerPrinter = require('./headerPrinter');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mongoose = require('mongoose');
const Initializer = require('./init/Initializer');
const User = require('./model/User');
const Room = require('./model/Room');
const Message =require('./model/Message');
const jsonwebtoken = require('jsonwebtoken');
const SocketRoutes = require('./socketRoutes');
const app = express();
Initializer.InitMongoDB(process.env,mongoose);
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
app.use(function(req, res, next) {
  next(createError(404));
});

io.use(SocketRoutes.handshake);
io.on('connection',(socket)=>{
  SocketRoutes.functions.TokenRefreshEmmit(socket);
  SocketRoutes.functions.SetSocketId(socket).then((user)=>{
    SocketRoutes.functions.JoinRooms(user,socket);
  });
  SocketRoutes.createRoom(socket,SocketRoutes.event.createRoom);
  SocketRoutes.hello(socket,SocketRoutes.event.hello);
  SocketRoutes.disconnect(socket,SocketRoutes.event.disconnect);
  SocketRoutes.searchUser(socket,SocketRoutes.event.searchUser);
  SocketRoutes.roomListSearch(socket,SocketRoutes.event.roomListSearch);
  SocketRoutes.InviteUser(socket,io,SocketRoutes.event.InviteUser);
  SocketRoutes.leaveRoom(socket,SocketRoutes.event.leaveRoom);
  SocketRoutes.searchFriend(socket,SocketRoutes.event.searchFriend);
  SocketRoutes.requestFriendShipUser(socket,SocketRoutes.event.requestFriendShipUser);
  SocketRoutes.acceptFriendShipRequest(socket,SocketRoutes.event.acceptFriendShipRequest);
  SocketRoutes.denyFriendShipRequest(socket,SocketRoutes.event.denyFriendShipRequest);
  SocketRoutes.removeFriendShipRequest(socket,SocketRoutes.event.removeFriendShipRequest);
  SocketRoutes.messageSend(io,socket,SocketRoutes.event.messageSend);
  SocketRoutes.messageLoad(socket,SocketRoutes.event.messageLoad);
  SocketRoutes.searchFriendRequest(socket,SocketRoutes.event.searchFriendRequest);
  SocketRoutes.joinRoomRequest(socket,SocketRoutes.event.joinRoomRequest);

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
