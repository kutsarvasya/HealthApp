import User from "../models/User.js";
import Meal from "../models/Meal.js";
import { ctrlWrapper } from "../decorators/index.js";
import HttpError from "../helpers/HttpError.js";

const setSettings = async (req, res) => {
  const { _id } = req.user;
  const avatarURL = req.file?.path ? req.file.path : req.user.avatarURL;
  const user = await User.findByIdAndUpdate(
    _id,
    {
      ...req.body,
      avatarURL,
    },
    { new: true }
  );
  res.json(user);
};

const changeWeight = async (req, res) => {
  const { _id } = req.user;
  const { _id: mealsId, changeWeight } = req.meals;
  const { weight } = req.body;

  if (changeWeight) {
    throw HttpError(400, "The weight could only change once a day");
  }

  const user = await User.findByIdAndUpdate(_id, { weight }, { new: true });
  const newMeal = await Meal.findByIdAndUpdate(
    mealsId,
    {
      changeWeight: true,
      weight: user.weight,
    },
    { new: true }
  );

  res.json(newMeal);
};

const changeGoal = async (req, res) => {
  const { _id } = req.user;
  const { goal } = req.body;

  const user = await User.findByIdAndUpdate(_id, { goal }, { new: true });

  res.json({
    goal: user.goal,
  });
};

export default {
  setSettings: ctrlWrapper(setSettings),
  changeWeight: ctrlWrapper(changeWeight),
  changeGoal: ctrlWrapper(changeGoal),
};
