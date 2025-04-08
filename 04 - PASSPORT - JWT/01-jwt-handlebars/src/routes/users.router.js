import { Router } from "express";
import {
  login,
  profile,
  register,
} from "../controllers/user.controller.js";
import { checkAuth } from "../middlewares/authJWT.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get('/profile', checkAuth, profile);

export default router;
