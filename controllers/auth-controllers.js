import bcrypt from "bcrypt";
import gravatar from "gravatar";
import User from "../models/User.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

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
  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.name,
      avatar: avatarURL,
    },
  });
};

export default {
  signup: ctrlWrapper(signup),
};
