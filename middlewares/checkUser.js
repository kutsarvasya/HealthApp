import { format } from "date-fns";

import Meal from "../models/Meal.js";

const checkUser = async (req, res, next) => {
  const { _id, gender, age, height, weight, activity } = req.user;

  const currentDate = format(new Date(), "yyyy-MM-dd");
  const data = await Meal.findOne({ owner: _id, date: currentDate });

  let BMR;
  const totalWater = 30 * weight;
  if (gender === "male") {
    BMR = Math.round(
      (88.362 + 13.397 * weight + 4.799 * height - 5.677 * age) * activity
    );
  } else {
    BMR = Math.round(
      (447.593 + 9.247 * weight + 3.098 * height - 4.33 * age) * activity
    );
  }
  let usersMeals;
  if (!data) {
    usersMeals = await Meal.create({
      owner: _id,
      date: currentDate,
      defaultCalories: BMR,
      weight: weight,
      defaultWater: totalWater,
    });
  } else {
    usersMeals = await Meal.findOneAndUpdate(
      { owner: _id, date: currentDate },
      { weight: weight },
      { new: true }
    );
  }
  req.meals = usersMeals;
  next();
};
export default checkUser;
