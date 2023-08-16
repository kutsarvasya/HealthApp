import dotenv from "dotenv";
dotenv.config();

const envConfig = {
  DB_HOST: process.env.DB_HOST,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  UKR_NET_EMAIL: process.env.UKR_NET_EMAIL,
  UKR_NET_PASSWORD: process.env.UKR_NET_PASSWORD,
};

export default envConfig;
