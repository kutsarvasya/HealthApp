import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Meal from "../models/Meal.js";
import { format } from "date-fns";

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
  const currentOne = Object.keys(req.body)[0];
  const currentTwo = req.body[currentOne];

  let fa = fat;
  let car = carbonohidrates;
  let pro = protein;

  currentTwo.map((food) => {
    fa += Number(food.fat) * 9;
    car += Number(food.carbonohidrates) * 4;
    pro += Number(food.protein) * 4;
    switch (currentOne) {
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
  const cal = pro + car + fa;
  const data = await Meal.findOneAndUpdate(
    { owner: _id, date: currentDate },
    {
      breakfast,
      dinner,
      snack,
      lunch,
      calories: cal,
      protein: pro,
      carbonohidrates: car,
      fat: fa,
    },
    { new: true }
  );
  res.json(data);
};

const getStatistics = async (req, res) => {};

export default {
  setWater: ctrlWrapper(setWater),
  getMealInfo: ctrlWrapper(getMealInfo),
  setMeal: ctrlWrapper(setMeal),
  getStatistics: ctrlWrapper(getStatistics),
};
