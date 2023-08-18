import mongoose from "mongoose";
import envConfig from "./configs/envConfigs.js";

import app from "./app.js";

const { DB_HOST } = envConfig;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(4000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
