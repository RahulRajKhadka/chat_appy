import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.js";

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (base64Image, folder = "chat-app") => {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: folder,
      resource_type: "auto",
      transformation: [
        { width: 1000, height: 1000, crop: "limit" }, /
        { quality: "auto" }, // Auto optimize quality
        { fetch_format: "auto" }, 
      ],
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image");
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log("Image deleted from Cloudinary:", publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
};

export default cloudinary;