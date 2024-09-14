const mongoose = require("mongoose");
const { memoSchema } = require("../schema");
const {noteSchema, checklistSchema} = require('../schema/content');

const Memo = mongoose.model("Memo", memoSchema);

const Note = Memo.discriminator('Note', noteSchema);
const Checklist = Memo.discriminator('Checklist', checklistSchema)

module.exports = {
  Note,
  Checklist
};
