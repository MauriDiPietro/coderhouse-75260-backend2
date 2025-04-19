// import { Router } from "express";
// import { userController } from "../controllers/user-controller.js";
// import passport from "passport";
// import { checkRole } from "../middlewares/check-role.js";

// const router = Router();

// router.post("/register", userController.register);
// router.post("/login", userController.login);
// router.get(
//     "/private-headers", 
//     passport.authenticate("jwt"), 
//     (req, res) => res.send(req.user)
// );
// router.get(
//   "/private-cookies",
//   passport.authenticate("jwt-cookies"),
//   (req, res) => res.send(req.user)
// );

// router.get(
//   "/private-cookies-admin",
//   passport.authenticate("jwt-cookies"),
//   checkRole("admin"),
//   (req, res) => res.send(req.user)
// );

// export default router;

import Router from "./custom-router.js";
import { userController } from "../controllers/user-controller.js";

export default class UserCustomRouter extends Router {
  init(){
    this.get('/', ['PUBLIC'], (req, res)=>res.send('ruta publica'));
    this.post('/register', ['PUBLIC'], userController.register);
    this.post('/login', ['PUBLIC'], userController.login);
    this.get('/private-cookies', ['USER', 'ADMIN'], (req, res) => res.send(req.user))
    this.get('/private-cookies-admin', ['ADMIN'], (req, res) => res.send(req.user))
  }
}

export const userCustomRouter = new UserCustomRouter()