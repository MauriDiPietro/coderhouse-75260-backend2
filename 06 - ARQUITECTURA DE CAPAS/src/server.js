import express from "express";
import { errorHandler } from "./middlewares/error-handler.js";
import productRouter from "./routes/product-router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);

app.use(errorHandler);

app.listen(8080, () => console.log("Server listening on port 8080"));
