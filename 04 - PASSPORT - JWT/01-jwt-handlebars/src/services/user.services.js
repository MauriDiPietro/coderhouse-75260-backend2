import { UserModel } from "../daos/models/user.model.js";
import UserDao from "../daos/user.dao.js";
import { generateToken } from "../middlewares/authJWT.js";
import { createHash, isValidPassword } from "../utils.js";

const userDao = new UserDao(UserModel);

export const getUserByEmail = async (email) => {
  try {
    return await userDao.getByEmail(email);
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserById = async (id) => {
  try {
    return await userDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (user) => {
  try {
    const { email, password } = user;
    const existUser = await getUserByEmail(email);
    if (!existUser) {
        const newUser = await userDao.register({
          ...user,
          password: createHash(password),
        });
        return newUser;
      }
    return existUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (user) => {
  try {
    const { email, password } = user;
    const userExist = await getUserByEmail(email);
    if (!userExist) return null;
    const passValid = isValidPassword(password, userExist);
    if (!passValid) return null;
    return generateToken(userExist);
    // return userExist;
  } catch (error) {
    throw new Error(error);
  }
};
