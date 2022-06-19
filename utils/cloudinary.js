const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// cloudinary.config({
//   cloud_name: "dwgl4ckoi",
//   api_key: "184513969866695",
//   api_secret: "52GqvBgYiwFL8ojQ5-8V9zCOq2c",
// });

module.exports = cloudinary;
