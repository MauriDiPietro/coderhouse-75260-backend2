import { userRepository } from "../repositories/user-repository.js";
import { createResponse } from "../utils.js";

export default class UserController {
  constructor(repository) {
    this.repository = repository;
  }

  register = async (req, res, next) => {
    try {
      const data = await this.repository.register(req.body);
      createResponse(res, 201, data);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const token = await this.repository.login(req.body);
      res.cookie("token", token, { httpOnly: true });
      createResponse(res, 200, token);
    } catch (error) {
      next(error);
    }
  };

  profile = async (req, res, next) => {
    try {
      const { id } = req.user;
      const user = await this.repository.getUserById(id);
      createResponse(res, 200, user);
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController(userRepository)