import { Schema, model } from "mongoose";
import { handleSaveError } from "./hooks/index.js";

const mealSchema = new Schema(
  {
    date: {
      type: String,
    },
    breakfast: {
      carbonohidrates: {
        type: Number,
        default: 0,
      },
      calories: {
        type: Number,
        default: 0,
      },
      protein: {
        type: Number,
        default: 0,
      },
      fat: {
        type: Number,
        default: 0,
      },
    },
    lunch: {
      carbonohidrates: {
        type: Number,
        default: 0,
      },
      calories: {
        type: Number,
        default: 0,
      },
      protein: {
        type: Number,
        default: 0,
      },
      fat: {
        type: Number,
        default: 0,
      },
    },
    dinner: {
      carbonohidrates: {
        type: Number,
        default: 0,
      },
      calories: {
        type: Number,
        default: 0,
      },
      protein: {
        type: Number,
        default: 0,
      },
      fat: {
        type: Number,
        default: 0,
      },
    },
    snack: {
      carbonohidrates: {
        type: Number,
        default: 0,
      },
      calories: {
        type: Number,
        default: 0,
      },
      protein: {
        type: Number,
        default: 0,
      },
      fat: {
        type: Number,
        default: 0,
      },
    },
    water: {
      type: Number,
      default: 1500,
    },
    weight: {
      type: Number,
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
