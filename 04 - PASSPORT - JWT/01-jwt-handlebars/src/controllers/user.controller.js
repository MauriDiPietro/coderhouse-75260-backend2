import * as services from "../services/user.services.js";

export const register = async (req, res, next) => {
  try {
    const response = await services.register(req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const token = await services.login(req.body);
    console.log(token)
    res.header("Authorization", token).json({ msg: "Login OK", token });
    // res.cookie('token', token, { httpOnly: true }).json({ msg: 'Login OK', token });
  } catch (error) {
    next(error);
  }
};

export const profile = async (req, res, next) => {
  try {
    console.log(req.user)
    const { first_name, last_name, email } = req.user;
    res.json({first_name, last_name, email});
  } catch (error) {
    next(error);
  }
};
