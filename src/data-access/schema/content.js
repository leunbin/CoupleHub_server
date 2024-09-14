const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: [String],
});

const checklistSchema = new mongoose.Schema({
  content: [{
    text: String,
    completed: Boolean,
  }],
});

module.exports = {
  noteSchema,
  checklistSchema,
};
