const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token")); // Check for authentication cookie

// get routes
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const gameRoutes = require("./routes/game");

// routes
app.use("/auth", authRoutes);
app.use("/", homeRoutes);
app.use("/games", gameRoutes);

// need to add get profile in get route and post route for profile

// mongoose setup
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "GamersHub",
  })
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(`${err} did not connect`);
  });
