import { connect } from "mongoose";

export const initMongoDB = async () => {
  try {
    await connect("mongodb://localhost:27017/coderhouse");
  } catch (error) {
    throw new Error("Error al conectar a la base de datos");
  }
};
