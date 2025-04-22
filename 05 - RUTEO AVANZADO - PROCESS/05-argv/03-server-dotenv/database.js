import { connect } from "mongoose";
import dotenv from "dotenv";

const ENV = process.argv[2];

dotenv.config({ path: ENV === "prd" ? "./.env.prd" : ENV === "qas" ? "./.env.qas" : "./.env.dev" });

export const initMongoDB = async () => {
  try {
    await connect(process.env.MONGO_URL);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
