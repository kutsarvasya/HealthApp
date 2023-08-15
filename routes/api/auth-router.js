import express from "express";
import authControllers from "../../controllers/auth-controllers.js";
const authRouter = express.Router();

authRouter.post("/signup", authControllers.signup);

export default authRouter;
