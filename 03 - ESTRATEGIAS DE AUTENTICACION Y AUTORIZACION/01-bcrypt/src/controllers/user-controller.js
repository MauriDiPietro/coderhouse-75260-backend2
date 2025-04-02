import { userService } from "../services/user-service.js";

class UserController {
  constructor(service) {
    this.service = service;
  }

  register = async (req, res, next) => {
    try {
      await this.service.register(req.body);
      return res.redirect("/");
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.service.login(email, password);
      req.session.first_name = user.first_name;
      return res.redirect("/profile");
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController(userService);
