import mongoose from "mongoose";
import Genre from "../models/genre";
import Author from "../models/genre";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
