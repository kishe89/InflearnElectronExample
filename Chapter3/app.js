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

const User = require('./model/User');
const jsonwebtoken = require('jsonwebtoken');
const Verifier = require('./util/Verifier');
const JWTVerifier = new Verifier();
const app = express();
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
io.use((socket,next)=>{
  console.log('handshake');
  const token = socket.handshake.query.token;
  const cert = "secret";
  console.log(`token is ${token}`);
  jsonwebtoken.verify(token,cert,(err,decodedUser)=>{
    if(err){
      // err.name==='TokenExpiredError'?next(new Error('TokenRefresh')):next(new Error('Unauthorized'));
      if(err.name==='TokenExpiredError'){
        socket.isExistNewToken = true;
        return next();
      }else{
        return next(new Error('Unauthorized'));
      }
      return;
    }
    User.findOne({id:decodedUser.id})
      .then((user)=>{
        if(!user){
          return next(new Error('Unauthorized'));
        }
        console.log(user.token===token);
        user.token===token?next():next(new Error('Unauthorized'));
        return;
      })
      .catch((error)=>{
        return next(new Error('Unauthorized'));
      });
  });
});
io.on('connection',(socket)=>{
  console.log('connect' + socket.id);
  console.log('isExist new token ?' + socket.isExistNewToken);
  if(socket.isExistNewToken){
    socket.emit('tokenRefresh-Required');
  }
  socket.on('hello',(message)=>{
    console.log(message);
  });
  socket.on('disconnect',(err)=>{
    console.log(err);
  });
  socket.on('createRoom',(message,ack)=>{

    const findUser = (decodedUser)=>{
      return User.findOne({id:decodedUser.id}).exec();
    };
    const createRoom = (user)=>{
      return new Promise((resolve,reject)=>{
        if(!user){
          return reject();
        }

      });
    };
    const sendAck = (user)=>{

        console.log(user.token===token);
        user.token===token?next():next(new Error('Unauthorized'));
        return;
    };
    JWTVerifier.verify(socket,message.token)
      .then(findUser)
      .then(createRoom)
      .then(sendAck)
  });
  socket.on('searchUser',(message,ack)=>{
    const findUser = ()=>{
      return User.findOne({id:message.id});
    };
    const sendAck = (user)=>{
      if(!user){
        const error = new Error('Not Found User');
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
    const sendFailureAck = (error)=>{
      console.log(error);
      message.foundUser = undefined;
      message.isSuccess = false;
      message.Error = error;
      ack(message);
    };
    JWTVerifier.verify(socket,message.token)
      .then(findUser)
      .then(sendAck)
      .catch(sendFailureAck)
  });
  socket.on('requestFriendShipUser',(message,ack)=>{
    const lexicalObject = {
      User:undefined,
      friend:undefined,
      Task:undefined,
      updateTasks:[]
    };

    const findUser = (decodedUser)=>{
      return new Promise((resolve,reject)=>{
        User.findOne({_id:decodedUser._id})
          .then((user)=>{
            if(!user)return reject(new Error('User Not Found'));
            return resolve(user);
          })
          .catch((error)=>{
            return reject(error);
          });
      });
    };
    const createFindFriendTask = (requestUser)=>{
      return new Promise((resolve, reject)=>{
        lexicalObject.User = requestUser;
        lexicalObject.Task = User.findOne({id:message.id});
        requestUser === undefined?reject(new Error('Not Found User')):resolve(lexicalObject);
      });
    };
    const excuteFindFriendTask = (lexicalObject)=>{
      return lexicalObject.Task;
    };
    const createFriendShipTask = (friend)=>{
      return new Promise((resolve,reject)=>{
        if(!friend){
          return reject(new Error('Not Found Friend'));
        }
        friend.friendReceiveRequests.push(lexicalObject.User._id);
        lexicalObject.User.friendRequests.push(friend._id);
        lexicalObject.updateTasks.push(friend.save().exec());
        lexicalObject.updateTasks.push(lexicalObject.User.save().exec());
        return resolve(lexicalObject);
      });
    };
    const excuteFriendShipTask = (task)=>{
      return Promise.all(task.updateTasks);
    };
    const sendSuccessAck = ()=>{
      message.isSuccess = true;
      ack(message);
    };
    const sendFailureAck = ()=>{
      message.isSuccess = false;
      ack(message);
    };
    JWTVerifier.verify(socket,message.token)
      .then(findUser)
      .then(createFindFriendTask)
      .then(excuteFindFriendTask)
      .then(createFriendShipTask)
      .then(excuteFriendShipTask)
      .then(sendSuccessAck)
      .catch(sendFailureAck)
  });
  socket.on('reconnectSuccess',(message)=>{
    console.log(`reconnect with ${message.message}`);
  });
});

app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
