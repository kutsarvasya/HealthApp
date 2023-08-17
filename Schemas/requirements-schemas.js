import Joi from "joi";

const userChangeWeightSchema = Joi.object({
  weight: Joi.string().required(),
});

const userChangeGoalSchema = Joi.object({
  goal: Joi.string().valid("lose fat", "maintain", "gain muscle").required(),
});

const userRequirementsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  gender: Joi.string().valid("male", "female").required(),
  age: Joi.string().required(),
  height: Joi.string().required(),
  weight: Joi.string().required(),
  activity: Joi.string()
    .valid("1.2", "1.375", "1.55", "1.725", "1.9")
    .required(),
});

export default {
  userChangeWeightSchema,
  userChangeGoalSchema,
  userRequirementsSchema,
};
