import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Meal from "../models/Meal.js";
import { format } from "date-fns";

const getMealInfo = async (req, res) => {
  const { _id: owner } = req.user;
  const { breakfast, lunch, dinner, snack } = req.body;
  const currentDate = format(new Date(), "yyyy-MM-dd");
  console.log(currentDate);

  const currentMeal = await Meal.findOne({ owner, date: currentDate });

  if (!currentMeal) {
    const newMeal = await Meal.create({
      owner,
      date: currentDate,
      breakfast,
      lunch,
      dinner,
      snack,
    });
    res.json(newMeal);
  } else {
    const updateMeal = await Meal.findByIdAndUpdate(currentMeal._id, {
      owner,
      date: currentDate,
      breakfast,
      lunch,
      dinner,
      snack,
    });
    res.json(updateMeal);
  }
};

export default {
  getMealInfo: ctrlWrapper(getMealInfo),
};
