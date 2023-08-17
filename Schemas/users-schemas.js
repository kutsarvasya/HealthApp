import Joi from "joi";

const userSignupSchema = Joi.object({
  password: Joi.string().min(6).max(16).required(),
  email: Joi.string()
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
  name: Joi.string().min(2).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string()
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
  password: Joi.string().min(6).max(16).required(),
});
const userEmailSchema = Joi.object({
  email: Joi.string()
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
});

export default {
  userSignupSchema,
  userLoginSchema,
  userEmailSchema,
};
