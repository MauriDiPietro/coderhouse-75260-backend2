import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.json());

app.get("/set-cookie", (req, res) => {
  res.cookie("idioma", "ingles").json({ message: "ok" });
});

app.get("/set-cookie2", (req, res) => {
  res.cookie("modo", "oscuro").json({ message: "ok" });
});

app.get("/set-signed-cookie", (req, res) => {
  res
    .cookie("idioma", "ingles", { signed: true, maxAge: 10000 })
    .json({ message: "ok" });
});

app.get("/get-cookie", (req, res) => {
  console.log(req.cookies)
  const { idioma } = req.cookies;
  idioma === "ingles" ? res.send("hello!") : res.send("hola!");
});

app.get("/get-signed-cookie", (req, res) => {
  // console.log(req.cookies)
  const { idioma } = req.signedCookies;
  idioma === "ingles" ? res.send("hello!") : res.send("hola!");
});

app.get("/clear-cookie", (req, res) => {
  res.clearCookie("idioma").json({ message: "clear cookie ok" });
});

app.get("/clear-cookies", (req, res) => {
  const cookies = req.cookies;

  const keys = Object.keys(cookies);

  //['idioma', 'modo', '']

  keys.forEach((key) => res.clearCookie(key));

  res.json({ message: "clear cookies ok" });
});

app.listen(8080, () => console.log("server listening on port 8080"));
