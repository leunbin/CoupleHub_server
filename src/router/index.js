const express = require('express');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const memoRouter = require('./memoRouter');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/memo', memoRouter);

module.exports = {
  api: router,
};