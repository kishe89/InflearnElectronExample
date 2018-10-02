'use strict';

var express = require('express');
var router = express.Router();
var loginM = require('./middleware/login');
var signInM = require('./middleware/signin');
var tokenM = require('./middleware/token');
router.post('/login', loginM.validateParameter, loginM.comparePassword, loginM.createJsonWebToken, loginM.updateUserWithToken, loginM.responseToUser);
router.post('/', signInM.createUser, signInM.saveUser, signInM.responseToUser);
router.get('/token', tokenM.validateParameter, tokenM.verifyToken, tokenM.findUser, tokenM.createToken, tokenM.responseToUser);

module.exports = router;
//# sourceMappingURL=users.js.map