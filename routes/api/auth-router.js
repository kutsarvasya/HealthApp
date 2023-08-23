import express from "express";

import authControllers from "../../controllers/auth-controllers.js";
import { validateBody } from "../../decorators/index.js";
import usersSchemas from "../../Schemas/users-schemas.js";
import { authenticate } from "../../middlewares/index.js";
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

authRouter.delete("/logout", authenticate, authControllers.logout);

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

authRouter.get("/google", authControllers.googleAuth);

authRouter.get("/google-redirect", authControllers.googleRedirect);

export default authRouter;
