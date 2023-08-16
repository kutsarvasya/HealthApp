import nodemailer from "nodemailer";

import envConfig from "../configs/envConfigs.js";

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = envConfig;

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
});

const mailer = async (massage) => {
  transporter.sendMail(massage, (err, info) => {
    if (err) return console.log("ошибка", err);
    console.log(info);
  });
  return true;
};

export default mailer;
