import bcrypt from "bcrypt";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import generator from "generate-password";
import axios from "axios";
import queryString from "query-string";
import User from "../models/User.js";
import { HttpError, mailer } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import envConfig from "../configs/envConfigs.js";

const {
  JWT_SECRET,
  UKR_NET_EMAIL,
  FRONTEND_URL,
  BASE_URL,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
} = envConfig;

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
      goal: newUser.goal,
      gender: newUser.gender,
      age: newUser.age,
      height: newUser.height,
      weight: newUser.weight,
      activity: newUser.activity,
    },
  });
};

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

  const tokenData = await axios({
    url: "https://oauth2.googleapis.com/token",
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const accessToken = tokenData.data.access_token;

  const userEmail = userData.data.email;

  const isUserExist = await User.findOne({ email: userEmail });
  if (!isUserExist) {
    const newUser = await User.create({
      email: userEmail,
    });

    const payload = {
      id: newUser._id,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(newUser._id, { token });

    isUserExist = newUser;
    isUserExist.accessToken = accessToken;
    await isUserExist.save();

    return res.redirect(
      `${FRONTEND_URL}/signup/goal?accessToken=${accessToken}&email=${userData.data.email}`
    );
  }

  const token = accessToken;
  await User.findByIdAndUpdate(isUserExist._id, { token });

  return res.redirect(
    `${FRONTEND_URL}/signup/goal?accessToken=${accessToken}&email=${userData.data.email}`
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  const newUser = await User.findByIdAndUpdate(user._id, { token });

  res.json(
    {
      user: newUser,
    },
    { new: true }
  );
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
    lowercase: true,
    uppercase: true,
  });
  const hashPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(user._id, { password: hashPassword });

  const resetPassword = {
    from: UKR_NET_EMAIL,
    to: email,
    subject: "reset password",
    html: `<strong>Hello,</strong><br>
    <p>This is your new password:</p>
    <strong>${newPassword}</strong><br>
    <p>Please use it to log in to your account.</p>`,
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
  googleAuth: ctrlWrapper(googleAuth),
  googleRedirect: ctrlWrapper(googleRedirect),
};
