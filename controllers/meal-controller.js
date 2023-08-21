import { format } from "date-fns";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import Meal from "../models/Meal.js";

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

const setMeal = async (req, res) => {
  const { _id } = req.user;
  const { breakfast, dinner, snack, lunch, carbonohidrates, fat, protein } =
    req.meals;
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const mealName = Object.keys(req.body)[0];
  const foodArr = req.body[mealName];

  let fatCal = fat;
  let carbonohidratesCal = carbonohidrates;
  let proteinCal = protein;

  let newFat = fat;
  let newCarbonohidrates = carbonohidrates;
  let newProtein = protein;

  const results = req.meals[mealName].filter(({ foodName: id1 }) =>
    foodArr.some(({ foodName: id2 }) => id2 === id1)
  );

  if (results.length > 0) {
    throw HttpError(400, "This food is already exist");
  }

  foodArr.map((food) => {
    fatCal += Number(food.fat) * 9;
    carbonohidratesCal += Number(food.carbonohidrates) * 4;
    proteinCal += Number(food.protein) * 4;
    newFat += Number(food.fat);
    newCarbonohidrates += Number(food.carbonohidrates);
    newProtein += Number(food.protein);
    switch (mealName) {
      case "breakfast":
        breakfast.push(food);
        break;
      case "dinner":
        dinner.push(food);
        break;
      case "snack":
        snack.push(food);
        break;
      case "lunch":
        lunch.push(food);
        break;
      default:
        break;
    }
  });
  const cal = proteinCal + carbonohidratesCal + fatCal;
  const data = await Meal.findOneAndUpdate(
    { owner: _id, date: currentDate },
    {
      breakfast,
      dinner,
      snack,
      lunch,
      calories: cal,
      protein: newProtein,
      carbonohidrates: newCarbonohidrates,
      fat: newFat,
    },
    { new: true }
  );
  res.json(data);
};

const updateMeal = async (req, res) => {
  const { id } = req.params;

  const meal = await Meal.findById(id);

  if (!meal) {
    throw HttpError(404, "Not Found");
  }
  const mealName = Object.keys(req.body)[0];
  const foodArr = req.body[mealName];

  const newMeals = meal[mealName].map((data) => {
    if (data.foodName === foodArr.foodName) {
      return foodArr;
    }
    return data;
  });

  const data = await Meal.findByIdAndUpdate(
    id,
    { [mealName]: newMeals },
    { new: true }
  );

  let calories = 0;

  const arr = [...data.breakfast, ...data.dinner, ...data.lunch, ...data.snack];
  arr.forEach((item) => {
    const a = item.carbonohidrates * 4 + item.protein * 4 + item.fat * 9;
    calories += a;
  });
  calories = Math.round(calories);

  const newData = await Meal.findByIdAndUpdate(id, { calories }, { new: true });

  res.json(newData);
};

const getStatistics = async (req, res) => {
  const { date } = req.query;

  const state = await Meal.find({
    date: {
      $gt: `${date}-00`,
      $lt: `${date}-32`,
    },
  }).sort({ date: 1 });
  res.json(state);
};

export default {
  setWater: ctrlWrapper(setWater),
  getMealInfo: ctrlWrapper(getMealInfo),
  setMeal: ctrlWrapper(setMeal),
  getStatistics: ctrlWrapper(getStatistics),
  updateMeal: ctrlWrapper(updateMeal),
};
