import { Router } from "express";
import passport from "passport";
import { userController } from "../controllers/user-controller.js";
import { isAuth } from "../middlewares/is-auth.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register"),
  userController.register
);

router.post(
  "/login",
  passport.authenticate("login"),
  userController.login
);

router.get("/private", isAuth, (req, res) => res.send("ruta privada"));

export default router;
