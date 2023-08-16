import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

async function upload(req, res, next) {
  await upload.single("avatar")(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: "File upload error" });
    }

    cloudinary.uploader.upload(
      req.file.path,
      { folder: "avatars" },
      function (error, result) {
        if (error) {
          return res.status(500).json({ message: "Error uploading to server" });
        }

        // Сохраните URL аватарки в базе данных юзера
        req.avatarUrl = result.secure_url;
        next();
      }
    );
  });
}

export default upload;
