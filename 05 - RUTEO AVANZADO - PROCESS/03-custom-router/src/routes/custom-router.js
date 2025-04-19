import { Router as CustomRouter } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export default class Router {
  constructor() {
    this.router = CustomRouter(); //const router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  // .get('/', midd, midd, cb)
  get(path, roles, ...cb) {
    this.router.get(path, this.checkRoles(roles), this.resolveCallbacks(cb));
  }

  post(path, roles, ...cb) {
    this.router.post(path, this.checkRoles(roles), this.resolveCallbacks(cb));
  }

  put(path, roles, ...cb) {
    this.router.put(path, this.checkRoles(roles), this.resolveCallbacks(cb));
  }

  delete(path, roles, ...cb) {
    this.router.delete(path, this.checkRoles(roles), this.resolveCallbacks(cb));
  }

  resolveCallbacks(callbacks) {
    return callbacks.map((cb) => async (...params) => {
      try {
        await cb.apply(this, params);
      } catch (error) {
        throw new Error(error);
      }
    });
  }

  checkRoles = (roles) => (req, res, next) => {
    try {
      if (roles[0] === "PUBLIC") return next();
      const token = req.cookies.token;
      const user = jwt.verify(token, process.env.JWT_SECRET);
      if (!roles.includes(user.role.toUpperCase()))
        return res.status(403).send("No tenes permisos");
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
}
