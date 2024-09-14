const mongoose = require("mongoose");
const { memoSchema } = require("../schema");
const { checklistSchema } = require('../schema/content');

const Memo = mongoose.model("Memo", memoSchema);

const Checklist = Memo.discriminator('Checklist', checklistSchema);

module.exports = Checklist;
