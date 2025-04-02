import bcrypt from "bcrypt";

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (passwordPlain, passwordHash) => {
  return bcrypt.compareSync(passwordPlain, passwordHash);
};

