const express = require('express');
const { memoController } = require('../controllers');

const memoRouter = express.Router();

memoRouter.get('/', memoController.getAllMemos);

memoRouter.get('/dueDate', memoController.getMemosByDuedate);

memoRouter.get('/:id', memoController.getMemosById);

memoRouter.post('/', memoController.postMemo);

memoRouter.put('/:id', memoController.putMemo);

memoRouter.delete('/:id', memoController.deleteMemo);

module.exports = memoRouter;