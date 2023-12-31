import Joi from "joi";

const mealsSetWaterSchema = Joi.object({
  water: Joi.number().required(),
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

const updateMealSchema = Joi.object({
  breakfast: Joi.object({
    foodName: Joi.string().required(),
    carbonohidrates: Joi.string().required(),
    fat: Joi.string().required(),
    protein: Joi.string().required(),
  }),
  snack: Joi.object({
    foodName: Joi.string().required(),
    carbonohidrates: Joi.string().required(),
    fat: Joi.string().required(),
    protein: Joi.string().required(),
  }),
  dinner: Joi.object({
    foodName: Joi.string().required(),
    carbonohidrates: Joi.string().required(),
    fat: Joi.string().required(),
    protein: Joi.string().required(),
  }),
  lunch: Joi.object({
    foodName: Joi.string().required(),
    carbonohidrates: Joi.string().required(),
    fat: Joi.string().required(),
    protein: Joi.string().required(),
  }),
})
  .xor("breakfast", "lunch", "snack", "dinner")
  .messages({
    "object.xor": "Please enter only one of Breakfast, Lunch, Snack, or Dinner",
  });

const getStatisticsSchema = Joi.object({
  date: Joi.string()
    .regex(/^\d{4}-\d{2}$/)
    .message('Date  format  should be "YYYY-MM"')
    .required(),
});

export default {
  mealsSetWaterSchema,
  mealSchema,
  updateMealSchema,
  getStatisticsSchema,
};
