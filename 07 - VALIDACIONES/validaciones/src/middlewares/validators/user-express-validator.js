import { check, validationResult } from "express-validator";

export const validatorRegister = [
  check("first_name")
    .exists()
    .not()
    .isEmpty(),
  check("last_name").exists().not().isEmpty(),
  check("email", "Debes enviar un email válido").exists().isEmail(),
  check("password").exists().not().isEmpty().isLength({ min: 8 }),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(400).send(error);
    }
  },
];


