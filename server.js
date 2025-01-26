require("dotenv").config();
require("./config/MongoDB.js");
require("./config/Cloudinary.js");
const cors = require('cors')

const express = require("express");
const multer = require("multer");
const app = express();
app.use(cors());
const teamRoutes = require("./route/team.routes.js");

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use("/team", upload.single("imgUrl"), teamRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
