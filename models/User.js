import { Schema, model } from "mongoose";

import { handleSaveError } from "./hooks/index.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      // required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      // required: [true, "Name is required"],
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      // required: true,
    },
    requirements: {
      type: Boolean,
      default: false,
    },
    goal: {
      type: String,
      enum: ["lose fat", "maintain", "gain muscle"],
      default: "lose fat",
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
      required: true,
    },
    age: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      default: 0,
    },
    activity: {
      type: String,
      enum: ["1.2", "1.375", "1.55", "1.725", "1.9"],
      default: "1.2",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
