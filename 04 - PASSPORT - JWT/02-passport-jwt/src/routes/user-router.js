import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import passport from "passport";
import { checkRole } from "../middlewares/check-role.js";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get(
    "/private-headers", 
    passport.authenticate("jwt"), 
    (req, res) => res.send(req.user)
);
router.get(
  "/private-cookies",
  passport.authenticate("jwt-cookies"),
  (req, res) => res.send(req.user)
);

router.get(
  "/private-cookies-admin",
  passport.authenticate("jwt-cookies"),
  checkRole("admin"),
  (req, res) => res.send(req.user)
);

export default router;
