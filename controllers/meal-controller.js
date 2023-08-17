import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import Meal from "../models/Meal.js";
import { format } from "date-fns";

// const addMealInfo = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { breakfast, lunch, dinner, snack } = req.body;
//   const currentDate = format(new Date(), "yyyy-MM-dd");
//   console.log(currentDate);

//   const currentMeal = await Meal.findOne({ owner, date: currentDate });

//   if (!currentMeal) {
//     const newMeal = await Meal.create({
//       owner,
//       date: currentDate,
//       breakfast,
//       lunch,
//       dinner,
//       snack,
//     });
//     res.json(newMeal);
//   } else {
//     const updateMeal = await Meal.findByIdAndUpdate(currentMeal._id, {
//       owner,
//       date: currentDate,
//       breakfast,
//       lunch,
//       dinner,
//       snack,
//     });
//     res.json(updateMeal);
//   }
// };

const getMealInfo = async (req, res) => {
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const { _id } = req.user;
  const data = await Meal.findOne({ owner: _id, date: currentDate });
  res.json(data);
};

const setWater = async (req, res) => {
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const { _id } = req.user;
  const { water } = req.body;
  const { water: currentWater } = req.meals;
  const totalWater = Number(currentWater) + Number(water);
  const data = await Meal.findOneAndUpdate(
    { owner: _id, date: currentDate },
    { water: totalWater },
    { new: true }
  );
  res.json(data);
};
export default {
  // addMealInfo: ctrlWrapper(addMealInfo),
  setWater: ctrlWrapper(setWater),
  getMealInfo: ctrlWrapper(getMealInfo),
};
