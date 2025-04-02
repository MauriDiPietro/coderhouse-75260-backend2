import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
const router = Router();

router.post("/register", userController.create);

router.post("/login", userController.login);

// router.post("/profile-admin", isAdmin, userController.profile);    //403 --> no autorizado


export default router;
