import "dotenv/config";
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import { initMongoDB } from "./db/connection.js";
import { apiRouter } from "./routes/index.js";
import { errorHandler } from "./middlewares/error-handler.js";
import "./middlewares/passport.js";

const app = express();

app
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(morgan("dev"))
  .use(passport.initialize())
  .use(cookieParser())
  .use("/api", apiRouter.getRouter())
  .use(errorHandler);

initMongoDB()
  .then(() => console.log("conectado a mongo"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server OK PORT: ${PORT}`));
