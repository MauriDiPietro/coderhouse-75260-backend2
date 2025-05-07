import jwt from "jsonwebtoken";
import "dotenv/config";
import CustomError from "../utils/custom-error.js";
import { userDaoMongo } from "../daos/mongodb/user-dao.js";
import { createHash, isValidPassword } from "../utils.js";
import UserDTO from "../dto/user-dto.js";
import { cartDaoMongo } from "../daos/mongodb/cart-dao.js";

class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  generateToken = (user, time = "10m") => {
    const payload = {
      id: user._id,
    };
    return jwt.sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: time });
  };

  getByEmail = async (email) => {
    try {
      return await this.dao.getByEmail(email);
    } catch (error) {
      throw new Error(error);
    }
  };

  register = async (user) => {
    try {
      const { email, password } = user;
      const existUser = await this.getByEmail(email);
      if (existUser) throw new CustomError("El usuario ya existe", 404);
      const cartUser = await cartDaoMongo.create();
      if (
        email === process.env.EMAIL_ADMIN &&
        password === process.env.PASS_ADMIN
      ) {
        // await transporter.sendMail(configMailHbs);
        return await this.dao.create({
          ...user,
          password: createHash(password),
          role: "admin",
          cart: cartUser._id,
        });
      } else {
        // await transporter.sendMail(configMailHbs);
        return await this.dao.create({
          ...user,
          password: createHash(password),
          cart: cartUser._id,
        });
      }
    } catch (error) {
      throw error;
    }
  };

  login = async (user) => {
    try {
      const { email, password } = user;
      const userExist = await this.getByEmail(email);
      if (!userExist) throw new CustomError("credenciales incorrectas", 401);
      const passValid = isValidPassword(password, userExist.password);
      if (!passValid) throw new CustomError("credenciales incorrectas", 401);
      return this.generateToken(userExist);
    } catch (error) {
      throw error;
    }
  };

  getUserById = async (id) => {
    try {
      const user = await this.dao.getUserById(id);
      return new UserDTO(user);
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const userRepository = new UserRepository(userDaoMongo);
