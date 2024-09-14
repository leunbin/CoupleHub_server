const express = require('express');
const { authController} = require('../controllers');

const authRouter = express.Router();

//POST /api/auth/login
authRouter.post('/login', authController.postLogIn);

module.exports = authRouter;