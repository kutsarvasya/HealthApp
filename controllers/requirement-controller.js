import User from "../models/User.js";
import { ctrlWrapper } from "../decorators/index.js";

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
  const { weight } = req.body;

  const user = await User.findByIdAndUpdate(_id, { weight }, { new: true });

  res.json({
    weight: user.weight,
  });
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
