import express from "express";
import { initMongoDB } from "./daos/mongodb/connection.js";
import { errorHandler } from "./middlewares/error-handler.js";
import productRouter from "./routes/product-router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);

app.use(errorHandler);

initMongoDB()
  .then(() => console.log("Conectado a mongodb"))
  .catch((error) => console.log(error));

app.listen(8080, () => console.log("Server listening on port 8080"));
