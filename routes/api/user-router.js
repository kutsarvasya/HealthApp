import express from "express";

import { validateBody } from "../../decorators/index.js";
import { authenticate, upload } from "../../middlewares/index.js";
import requirementsSchemas from "../../Schemas/requirements-schemas.js";
import requirementController from "../../controllers/requirement-controller.js";
import mealController from "../../controllers/meal-controller.js";

const userRouter = express.Router();

userRouter.post(
  "/settings",
  authenticate,
  upload.single("avatar"),
  validateBody(requirementsSchemas.userRequirementsSchema),
  requirementController.setSettings
);

userRouter.put(
  "/weight",
  authenticate,
  validateBody(requirementsSchemas.userChangeWeightSchema),
  requirementController.changeWeight
);

userRouter.put(
  "/goal",
  authenticate,
  validateBody(requirementsSchemas.userChangeGoalSchema),
  requirementController.changeGoal
);

userRouter.post("/food-intake", authenticate, mealController.getMealInfo);

export default userRouter;
