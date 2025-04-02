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

  login = async (req, res, next) => {
    try {
      const id = req.session.passport.user;
      const user = await userService.getById(id);
      res.json({
        message: 'Login ok',
        session: req.session,
        user: user
      })
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController(userService);
