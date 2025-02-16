import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "../config/cloudinary";

cloudinaryConfig;

export const upload = multer({ dest: "uploads/" });

export const uploadMedia = async (file: any) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "uploads",
      use_filename: true,
      resource_type: file.mimetype.startsWith("image/") ? "image" : "video", 
    });
    return result.secure_url;
  } catch (error: any) {
    throw new Error("Failed to upload media to Cloudinary: " + error.message);
  }
};

// Function to handle multiple file uploads (either images or videos)
export const uploadMultipleMedia = async (files: any) => {
  try {
    const uploadedMedia = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "uploads",
        use_filename: true,
        resource_type: file.mimetype.startsWith("image/") ? "image" : "video",
      });

      uploadedMedia.push(result.secure_url);
    }
    return uploadedMedia;
  } catch (error: any) {
    throw new Error("Failed to upload media to Cloudinary: " + error.message);
  }
};
