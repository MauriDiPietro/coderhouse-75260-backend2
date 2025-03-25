import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { __dirname } from "./utils.js";
import usersRouter from "./routes/user-router.js";
import mongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/view-router.js";
import { initMongoDB } from "./db/dbConfig.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const sessionConfig = {
  secret: "sessionKey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000,
  },
  store: new mongoStore({
    mongoUrl: "mongodb://127.0.0.1:27017/coderhouse",
    ttl: 60,
    // crypto: {
    //   secret: '1234',       //encripta los datos de la sesion
    // },
  }),
};

// mongo session
app.use(session(sessionConfig));

initMongoDB()
  .then(() => console.log("Base de datos coenctada"))
  .catch((error) => console.log(error));

app.use("/users", usersRouter);
app.use("/", viewsRouter);

app.use(errorHandler);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});
