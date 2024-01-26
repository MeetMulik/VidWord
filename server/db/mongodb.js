import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDb Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
