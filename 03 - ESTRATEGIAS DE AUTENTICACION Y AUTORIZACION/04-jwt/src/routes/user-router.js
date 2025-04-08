import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import { checkAuthTokenHeaders } from "../middlewares/check-auth.js";
import { checkAuthTokenCookies } from "../middlewares/check-auth.js";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/private-headers", checkAuthTokenHeaders, (req, res) =>res.send(req.user));
router.get("/private-cookies", checkAuthTokenCookies, (req, res) =>res.send(req.user));

export default router;
