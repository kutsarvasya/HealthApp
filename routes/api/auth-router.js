import express from "express";
import authControllers from "../../controllers/auth-controllers.js";
import { validateBody } from "../../decorators/index.js";
import usersSchemas from "../../Schemas/users-schemas.js";
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

export default authRouter;
