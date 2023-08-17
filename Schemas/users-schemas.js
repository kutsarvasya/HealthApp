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
// const userRequirementsSchema = Joi.object({
//   goal: Joi.string().valid("lose fat", "maintain", "gain muscle").required(),
//   gender: Joi.string().valid("male", "female").required(),
//   age: Joi.string().required(),
//   height: Joi.string().required(),
//   weight: Joi.string().required(),
//   activity: Joi.string()
//     .valid("1.2", "1.375", "1.55", "1.725", "1.9")
//     .required(),
// });

export default {
  userSignupSchema,
  userLoginSchema,
  userEmailSchema,
  // userRequirementsSchema,
};
