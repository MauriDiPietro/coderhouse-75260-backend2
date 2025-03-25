import mongoose from "mongoose";

const connectionString =
  "mongodb://localhost:27017/coderhouse";

export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
  } catch (error) {
    throw new Error(`ERROR => ${error}`);
  }
};
