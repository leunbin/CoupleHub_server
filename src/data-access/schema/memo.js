const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["note", "checklist"],
      required: true,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    author: {
      type: String,
      required: true,
    },
    priority: {
      type: Boolean,
      default: false,
    },
    private : {
      type:Boolean,
      default: false,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    discriminatorKey: "type",
    collection: "Memo",
  }
);

module.exports = memoSchema;
