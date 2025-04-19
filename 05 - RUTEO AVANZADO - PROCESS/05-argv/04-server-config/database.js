import mongoose from "mongoose";
import "dotenv/config";

let MONGO_URL = process.env.MONGO_URL;

try {
  await mongoose.connect(MONGO_URL);
  console.log("Conectado a la base de datos de MongoDB");
} catch (error) {
  console.log(`ERROR => ${error}`);
}

