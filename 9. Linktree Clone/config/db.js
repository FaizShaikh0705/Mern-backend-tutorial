// importing modules
import mongoose from "mongoose";


/**
 * @desc This methods creates a connection with MongoDB atlas
 * database.
*/
const connectDB = async () => {
  try {
    
    const conn = await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(`Database Connected: ${conn.connection.host}`.blue.underline);
  } catch (error) {
    console.log(`MongoDB Error: ${error}`.red.underline);
  }
};

export default connectDB;
