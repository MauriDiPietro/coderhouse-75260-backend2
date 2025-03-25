import mongoose from "mongoose";

export const initMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/coderhouse");
  } catch (error) {
    throw new Error(error);
  }
};
