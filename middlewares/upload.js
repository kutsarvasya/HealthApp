import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "../configs/envConfigs";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

function upload(req, res, next) {
  const { avatarURL } = req.body;
  console.log();
  cloudinary.uploader.upload(
    avatarURL,
    { folder: "avatars" },
    function (error, result) {
      if (error) {
        return res.status(500).json({ message: "Error uploading to server" });
      }

      req.avatarUrl = result.secure_url;
      next();
    }
  );
}

export default upload;
