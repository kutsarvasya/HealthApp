import express from "express";

import authControllers from "../../controllers/auth-controllers.js";
import { validateBody } from "../../decorators/index.js";
import usersSchemas from "../../Schemas/users-schemas.js";
import { authenticate, upload } from "../../middlewares/index.js";
import requirementsSchemas from "../../Schemas/requirements-schemas.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(usersSchemas.userSignupSchema),
  authControllers.signup
);

authRouter.post(
  "/login",
  validateBody(usersSchemas.userLoginSchema),
  authControllers.login
);
authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.logout);
authRouter.post(
  "/forgot-password",
  validateBody(usersSchemas.userEmailSchema),
  authControllers.resendPassword
);

authRouter.post(
  "/requirements",
  authenticate,
  validateBody(requirementsSchemas.userRequirementsSchema),
  authControllers.requirements
);

authRouter.post(
  "/settings",
  authenticate,
  upload.single("avatar"),
  validateBody(requirementsSchemas.userRequirementsSchema),
  authControllers.setSettings
);

authRouter.patch(
  "/weight",
  authenticate,
  validateBody(requirementsSchemas.userChangeWeightSchema),
  authControllers.changeWeight
);

authRouter.patch(
  "/goal",
  authenticate,
  validateBody(requirementsSchemas.userChangeGoalSchema),
  authControllers.changeGoal
);

export default authRouter;
