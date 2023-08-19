import express from "express";
import logger from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import authRouter from "./routes/api/auth-router.js";
import userRouter from "./routes/api/user-router.js";
import swaggerJson from "./swagger.json" assert { type: "json" };

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
