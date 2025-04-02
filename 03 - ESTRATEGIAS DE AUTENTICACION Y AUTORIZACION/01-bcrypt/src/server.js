import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import handlebars from "express-handlebars";
import path from "path";
import { initMongoDB } from "./config/db.js";
import MongoStore from "connect-mongo";
import { errorHandler } from "./middlewares/error-handler.js";
import userRouter from "./routes/user-router.js";
import viewsRouter from "./routes/views-router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${process.cwd()}/src/views`));
app.set("view engine", "handlebars");

const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/coderhouse",
    ttl: 180,
  }),
  secret: "1234",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 180000,
  },
};

app.use(session(sessionConfig));

app.use("/", viewsRouter);
app.use("/users", userRouter);

app.use(errorHandler);

initMongoDB()
  .then(() => console.log("conectado a mongo"))
  .catch((error) => console.log(error));

app.listen(8080, () => console.log("server ok, puerto 8080"));
