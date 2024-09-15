const express = require('express');
const { scheduleController } = require('../controllers');

const scheduleRouter = express.Router();

scheduleRouter.get('/', scheduleController.getSchedules);

scheduleRouter.get('/date', scheduleController.getScheduleByDate);

scheduleRouter.get('/:id',scheduleController.getScheduleById);

scheduleRouter.post ('/',scheduleController.postSchedule);

scheduleRouter.put('/:id',scheduleController.putSchedule);

scheduleRouter.delete('/:id', scheduleController.deleteSchedule);

module.exports = scheduleRouter;