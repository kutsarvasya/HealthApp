import { Schema, model } from "mongoose";

import { handleSaveError } from "./hooks/index.js";

const mealSchema = new Schema(
  {
    date: {
      type: String,
    },
    breakfast: {
      type: Array,
      default: [],
      required: true,
    },

    lunch: {
      type: Array,
      default: [],
      required: true,
    },
    dinner: {
      type: Array,
      default: [],
      required: true,
    },
    snack: {
      type: Array,
      default: [],
      required: true,
    },
    water: {
      type: Number,
      default: 0,
      required: true,
    },
    defaultWater: {
      type: Number,
      default: 0,
      required: true,
    },
    calories: {
      type: Number,
      default: 0,
      required: true,
    },
    defaultCalories: {
      type: Number,
      default: 0,
      required: true,
    },
    weight: {
      type: Number,
      default: 0,
      required: true,
    },
    carbonohidrates: {
      type: Number,
      default: 0,
      required: true,
    },
    fat: {
      type: Number,
      default: 0,
      required: true,
    },
    protein: {
      type: Number,
      default: 0,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

mealSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});
mealSchema.post("save", handleSaveError);
mealSchema.post("findOneAndUpdate", handleSaveError);

const Meal = model("meal", mealSchema);

export default Meal;
