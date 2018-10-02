'use strict';
const express = require('express');
const router = express.Router();

const login = require('./middleware/user/login');
const signIn = require('./middleware/user/signin');
const token = require('./middleware/user/token');
router.post('/',signIn.createUser,signIn.saveUser,signIn.responseToUser);
router.post('/login',login.validateParameter,login.comparePassword,login.createJsonWebToken,login.updateUserWithToken,login.responseToUser);
router.get('/token',token.validateParameter,token.verfyToken,token.findUser,token.createToken,token.responseToUser);

module.exports = router;
