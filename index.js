const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

const cloudinary = require("./imgjs/cloudinary")
const upload = require("./imgjs/multer");
const User = require("./models/User");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name); //name form client side
//   },
// });

// const upload = multer({ storage: storage });

const testvar =''
app.post("/api/uploadUser", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path)
    console.log(result.url)
    console.log(req.body.userid)
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.body.userid, 
        {
          profilePic: result.url, //Update every requested info
        },
        { new: true } //returns the updated user otherwise return old user
      );
      console.log(updatedUser)
    } catch (err) {
      console.log(err)
    }
    
  } catch (err) {
    console.log(err)
  }
  // console.log(result) 
  res.status(200).json("File has been uploaded");
});

//upload post photo 
app.post("/api/uploadPost", upload.single("file"), async (req, res) => {
  let result
  try {
    result = await cloudinary.uploader.upload(req.file.path)

    } catch (err) {
      console.log(err)
    }
  // console.log(result) 
  res.status(200).json(result);
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || "5000", () => {
  console.log("Backend is running");
});

