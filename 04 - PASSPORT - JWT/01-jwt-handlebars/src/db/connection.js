import mongoose from 'mongoose';
import 'dotenv/config'

const connectionString = process.env.MONGO_URL;

export const initMongoDB = async() => {
  try {
    await mongoose.connect(connectionString);
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
}
