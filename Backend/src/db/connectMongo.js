import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
const connectMongo = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connection successful || DB host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error while connection to Database", error);
    process.exit(1);
  }
};

export default connectMongo;
