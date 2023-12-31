import express from "express";

import { validateBody } from "../../decorators/index.js";
import { authenticate, upload, checkUser } from "../../middlewares/index.js";
import requirementsSchemas from "../../Schemas/requirements-schemas.js";
import requirementController from "../../controllers/requirement-controller.js";
import mealController from "../../controllers/meal-controller.js";
import mealsSchemas from "../../Schemas/meals-schemas.js";

const userRouter = express.Router();

userRouter.post(
  "/settings",
  authenticate,
  upload.single("avatar"),
  validateBody(requirementsSchemas.userSettingsSchema),
  requirementController.setSettings
);

userRouter.put(
  "/weight",
  authenticate,
  checkUser,
  validateBody(requirementsSchemas.userChangeWeightSchema),
  requirementController.changeWeight
);

userRouter.put(
  "/goal",
  authenticate,
  validateBody(requirementsSchemas.userChangeGoalSchema),
  requirementController.changeGoal
);

userRouter.get(
  "/food-intake",
  authenticate,
  checkUser,
  mealController.getMealInfo
);

userRouter.post(
  "/water-intake",
  authenticate,
  validateBody(mealsSchemas.mealsSetWaterSchema),
  checkUser,
  mealController.setWater
);

userRouter.post(
  "/food-intake",
  authenticate,
  validateBody(mealsSchemas.mealSchema),
  checkUser,
  mealController.setMeal
);

userRouter.put(
  "/food-intake/:id",
  authenticate,
  validateBody(mealsSchemas.updateMealSchema),
  mealController.updateMeal
);

userRouter.get(
  "/statistics",
  authenticate,
  mealController.getYearMonthStatistics
);

userRouter.get(
  "/statistics-year",
  authenticate,
  mealController.getYearStatistics
);

export default userRouter;
