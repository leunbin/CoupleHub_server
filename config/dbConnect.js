const mongoose = require("mongoose");
require('dotenv').config();

const dbConnect = async () => {
  try{
    const connect = await mongoose.connect(process.env.DB_URL);
    console.log("DB connected ℹ️");
  } catch(error) {
    console.log("DB not connected😢", error);
  }
}

module.exports = dbConnect;