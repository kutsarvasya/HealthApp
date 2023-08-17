import Joi from "joi";

const mealsSetWaterSchema = Joi.object({
  water: Joi.string().required(),
});

export default {
  mealsSetWaterSchema,
};
