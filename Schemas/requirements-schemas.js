import Joi from "joi";

const userChangeWeightSchema = Joi.object({
  weight: Joi.number().required(),
});

const userChangeGoalSchema = Joi.object({
  goal: Joi.string().valid("lose fat", "maintain", "gain muscle").required(),
});

const userRequirementsSchema = Joi.object({
  name: Joi.string().min(3).required().trim(),
  gender: Joi.string().valid("male", "female").required(),
  age: Joi.number().required(),
  height: Joi.number().required(),
  weight: Joi.number().required(),
  activity: Joi.string()
    .valid("1.2", "1.375", "1.55", "1.725", "1.9")
    .required(),
});

export default {
  userChangeWeightSchema,
  userChangeGoalSchema,
  userRequirementsSchema,
};
