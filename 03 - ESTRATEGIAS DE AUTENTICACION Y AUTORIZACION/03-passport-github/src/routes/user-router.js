import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import { passportCall } from "../middlewares/passport-call.js";

const router = Router();

//! --> |INICIAR CON GITHUB| <--- boton
router.get(
  "/register-github",
  passportCall("github", { scope: ["user:email"] })
);

router.get(
  "/profile",
  passportCall("github", { scope: ["user:email"] }),
  userController.githubResponse
);

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("logout ok");
});

export default router;
