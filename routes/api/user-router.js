import express from "express";

import { validateBody } from "../../decorators/index.js";
import { authenticate, upload } from "../../middlewares/index.js";
import requirementsSchemas from "../../Schemas/requirements-schemas.js";
import requirementController from "../../controllers/requirement-controller.js";

const userRouter = express.Router();

userRouter.post(
  "/settings",
  authenticate,
  upload.single("avatar"),
  validateBody(requirementsSchemas.userRequirementsSchema),
  requirementController.setSettings
);

userRouter.patch(
  "/weight",
  authenticate,
  validateBody(requirementsSchemas.userChangeWeightSchema),
  requirementController.changeWeight
);

userRouter.patch(
  "/goal",
  authenticate,
  validateBody(requirementsSchemas.userChangeGoalSchema),
  requirementController.changeGoal
);

export default userRouter;
