import { format } from "date-fns";

import Meal from "../models/Meal.js";

const checkUser = async (req, res, next) => {
  const {
    _id,
    gender: currentGender,
    age: currentAge,
    height: currentHeight,
    weight: currentWeight,
    activity: currentActivity,
  } = req.user;
  const {
    weight: newWeight,
    age: newAge,
    height: newHeight,
    activity: newActivity,
    gender: newGender,
  } = req.body;

  const weight = newWeight ? newWeight : currentWeight;
  const age = newAge ? newAge : currentAge;
  const height = newHeight ? newHeight : currentHeight;
  const activity = newActivity ? newActivity : currentActivity;
  const gender = newGender ? newGender : currentGender;
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const data = await Meal.findOne({ owner: _id, date: currentDate });

  let BMR;
  let goalFat;
  let goalProtein;
  let goalCarbo;

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
  goalFat = parseFloat((0.3 * BMR) / 4).toFixed(1);
  goalProtein = parseFloat((0.3 * BMR) / 4).toFixed(1);
  goalCarbo = parseFloat((0.4 * BMR) / 4).toFixed(1);

  if (!data) {
    usersMeals = await Meal.create({
      owner: _id,
      date: currentDate,
      defaultCalories: BMR,
      weight: weight,
      defaultWater: totalWater,
      goalFat,
      goalCarbo,
      goalProtein,
    });
  } else {
    usersMeals = await Meal.findOneAndUpdate(
      { owner: _id, date: currentDate },
      { weight: weight, defaultWater: totalWater, defaultCalories: BMR },

      { new: true }
    );
  }
  req.meals = usersMeals;
  next();
};
export default checkUser;
