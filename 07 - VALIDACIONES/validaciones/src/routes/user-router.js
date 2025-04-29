import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import passport from "passport";
import { checkRole } from "../middlewares/check-role.js";
import { validatorRegister } from "../middlewares/validators/user-express-validator.js";
import { validatorRegisterJoi } from "../middlewares/validators/user-joi-validator.js";
import { validatorRegisterJSONSchema } from "../middlewares/validators/user-json-schema-validator.js";
import { validatorJS } from "../middlewares/validators/user-validator.js";

const router = Router();

router.post(
  "/register", 
  // validatorRegister, 
  // validatorRegisterJoi,
  // validatorRegisterJSONSchema,
  validatorJS,
  userController.register
);

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
