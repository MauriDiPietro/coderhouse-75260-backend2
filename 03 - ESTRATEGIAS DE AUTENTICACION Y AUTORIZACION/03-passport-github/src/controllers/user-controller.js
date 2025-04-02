import { userService } from "../services/user-service.js";

class UserController {
  constructor(service) {
    this.service = service;
  }

  register = async (req, res, next) => {
    try {
      res.json({
        message: 'Register ok',
        session: req.session,
      })
    } catch (error) {
      next(error);
    }
  };

  githubResponse = async (req, res, next) => {
    try {
      const user = req.user;
      res.json({
        message: 'Login ok',
        session: req.session,
        user
      })
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController(userService);
