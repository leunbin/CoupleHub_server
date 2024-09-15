const mongoose = require('mongoose');
const { scheduleSchema } = require('../schema');

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;