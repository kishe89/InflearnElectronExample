'use strict';

var express = require('express');
var router = express.Router();

var login = require('./middleware/user/login');
var signIn = require('./middleware/user/signin');
var token = require('./middleware/user/token');
router.post('/', signIn.createUser, signIn.saveUser, signIn.responseToUser);
router.post('/login', login.validateParameter, login.comparePassword, login.createJsonWebToken, login.updateUserWithToken, login.responseToUser);
router.get('/token', token.validateParameter, token.verfyToken, token.findUser, token.createToken, token.responseToUser);

module.exports = router;
//# sourceMappingURL=users.js.map