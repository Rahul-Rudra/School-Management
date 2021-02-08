const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://Rahul:NApz2T2FcT7tjrXQ@cluster0.zjhbo.mongodb.net/School?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected");
  
  } catch (error) {
    console.log(error.message)
  }
  
}
module.exports = connectDB;
