import Joi from "joi";

const mealsSetWaterSchema = Joi.object({
  water: Joi.string().required(),
});

const foodSchema = Joi.object({
  foodName: Joi.string().required(),
  carbonohidrates: Joi.string().required(),
  fat: Joi.string().required(),
  protein: Joi.string().required(),
});

const mealSchema = Joi.object({
  breakfast: Joi.array().items(foodSchema),
  snack: Joi.array().items(foodSchema),
  dinner: Joi.array().items(foodSchema),
  lunch: Joi.array().items(foodSchema),
})
  .xor("breakfast", "lunch", "snack", "dinner")
  .messages({
    "object.xor": "Please enter only one of Breakfast, Lunch, Snack, or Dinner",
  });

export default {
  mealsSetWaterSchema,
  mealSchema,
};
