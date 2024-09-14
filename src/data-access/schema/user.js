const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNum: {
      type: String,
      required: true,
    },
  },
  {
    collection: "User",
  }
);

module.exports = userSchema;
