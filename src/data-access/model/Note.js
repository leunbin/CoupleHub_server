const mongoose = require("mongoose");
const { memoSchema } = require("../schema");
const { noteSchema } = require('../schema/content');

const Memo = mongoose.model("Memo", memoSchema);

const Note = Memo.discriminator('Note', noteSchema);

module.exports = Note;
