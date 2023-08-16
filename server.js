import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const { DB_HOST } = process.env;

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
