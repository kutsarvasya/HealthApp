import express from "express";

import authControllers from "../../controllers/auth-controllers.js";
import { validateBody } from "../../decorators/index.js";
import usersSchemas from "../../Schemas/users-schemas.js";
import { authenticate, upload } from "../../middlewares/index.js";

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
  validateBody(usersSchemas.userRequirementsSchema),
  authControllers.requirements
);

authRouter.post(
  "/settings",
  authenticate,
  upload.single("avatar"),
  validateBody(usersSchemas.userRequirementsSchema),
  authControllers.setSettings
);

export default authRouter;
