import bcrypt from "bcrypt";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import envConfig from "../configs/envConfigs.js";
import generator from "generate-password";

import User from "../models/User.js";
import { HttpError, mailer } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET, UKR_NET_EMAIL } = envConfig;

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    password: hashPassword,
    email,
    name,
    avatarURL,
  });
  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(newUser._id, { token });
  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.name,
      requirements: newUser.requirements,
      avatar: avatarURL,
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  const newUser = await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    email: newUser.email,
    name: newUser.name,
    avatarURL: newUser.avatarURL,
    requirements: newUser.requirements,
  });
};

const getCurrent = async (req, res) => {
  const { email, name, avatarURL, requirements } = req.user;
  res.json({
    email,
    name,
    avatarURL,
    requirements,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(200).json({
    message: "Logout success",
  });
};
const resendPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "email not found");
  }
  const newPassword = generator.generate({
    length: 10,
    numbers: true,
  });
  const hashPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(user._id, { password: hashPassword });

  const resetPassword = {
    from: UKR_NET_EMAIL,
    to: email,
    subject: "reset password",
    html: `<p>${newPassword}</p>`,
  };
  await mailer(resetPassword);

  res.status(201).json({
    email,
  });
};

const uploadAvatar = async (req, res) => {
  const { _id } = req.user;
  const { avatarURL } = req.body;

  await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  res.status(200).json({
    avatarURL,
  });
};

const requirements = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(
    _id,
    { ...req.body, requirements: true },
    { new: true }
  );
  res.status(200).json(user);
};


export default {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  resendPassword: ctrlWrapper(resendPassword),
  uploadAvatar: ctrlWrapper(uploadAvatar),
  requirements: ctrlWrapper(requirements),
};
