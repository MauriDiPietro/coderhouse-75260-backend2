import Joi from "joi";

const registerSchema = Joi.object({
  first_name: Joi.string().min(2).max(30).required(),
  last_name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "es", "ar"] },
  }),
  age: Joi.number(),
  password: Joi.string()
    .min(8)
    .max(30)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export const validatorRegisterJoi = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  error ? res.status(400).send(error) : next();
};
