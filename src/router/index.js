const express = require('express');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const memoRouter = require('./memoRouter');
const scheduleRouter = require('./scheduleRouter');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/memo', memoRouter);
router.use('/schedule',scheduleRouter);

module.exports = {
  api: router,
};