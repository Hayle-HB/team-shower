const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");

const uploadDirectory = path.join(__dirname, "../uploads");

const ImageUploader = async (file) => {
  try {
    if (!file) {
      throw new Error("No file uploaded.");
    }

    const fileName = Date.now() + path.extname(file.originalname);
    const filePath = path.join(uploadDirectory, fileName);

    // Save the file locally to the uploads directory
    fs.writeFileSync(filePath, file.buffer);

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "team_images",
    });

    // Delete the local file after uploading to Cloudinary
    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};

module.exports = ImageUploader;
