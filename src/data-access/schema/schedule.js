const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },

  startTime:{
    type:String,
  },

  endTime:{
    type:String
  },

  event: {
    type: String,
    required: true,
  },

  location: {
    type: String,
  },

  note: {
    type: String,
  },

  boxcolor: {
    type:String,
    default:'black'
  }
});

module.exports = scheduleSchema;