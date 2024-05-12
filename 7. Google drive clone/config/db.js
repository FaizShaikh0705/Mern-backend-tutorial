// importing modules
import mongoose from "mongoose";


/**
 * @desc This methods creates a connection with MongoDB atlas
 * database.
*/
const connectDB = async () => {
  try {
    
    const conn = await mongoose.connect(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@mohsinogen.smovl.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
    );

    console.log(`Database Connected: ${conn.connection.host}`.blue.underline);
  } catch (error) {
    console.log(`MongoDB Error: ${error}`.red.underline);
  }
};

export default connectDB;
