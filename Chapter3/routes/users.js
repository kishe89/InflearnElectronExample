'use strict';
const express = require('express');
const router = express.Router();
const loginM = require('./middleware/login');
const signInM = require('./middleware/signin');
const tokenM = require('./middleware/token');
router.post('/login',loginM.validateParameter,loginM.comparePassword,loginM.createJsonWebToken,loginM.updateUserWithToken,loginM.responseToUser);
router.post('/',signInM.createUser,signInM.saveUser,signInM.responseToUser);
router.get('/token',tokenM.validateParameter,tokenM.verifyToken,tokenM.findUser,tokenM.createToken,tokenM.responseToUser);

module.exports = router;
