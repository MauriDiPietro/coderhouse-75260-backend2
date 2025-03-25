import { userDao } from "../daos/user-dao.js";
import CustomError from "../utils/custom-error.js";

class UserService {
  constructor(dao) {
    this.dao = dao;
  }

  create = async (body) => {
    try {
      const response = await this.dao.create(body);
      if (!response) throw new CustomError("Error creating user", 400);
      return response;
    } catch (error) {
      throw error;
    }
  };

  login = async (email, password) => {
    try {
      const response = await this.dao.login(email, password);
      if (!response) throw new CustomError("User not found", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getAll = async () => {
    try {
      return await this.dao.getAll();
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const response = await this.dao.getById(id);
      if (!response) throw new CustomError("User not found", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, body) => {
    try {
      const response = await this.dao.update(id, body);
      if (!response) throw new CustomError("User not found", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const response = await this.dao.delete(id);
      if (!response) throw new CustomError("User not found", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export const userService = new UserService(userDao);
