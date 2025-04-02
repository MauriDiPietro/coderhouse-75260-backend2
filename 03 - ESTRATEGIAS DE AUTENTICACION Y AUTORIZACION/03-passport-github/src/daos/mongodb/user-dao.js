import { UserModel } from "./models/user-model.js";
import MongoDao from "./mongo-dao.js";

class UserDao extends MongoDao {
  constructor(model) {
    super(model);
  }

  getByEmail = async (email) => {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const userDao = new UserDao(UserModel);
