const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userRoute = express.Router();

const UserModel = require("../models/User.model");

userRoute.post("/register", (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 6, async function (err, hash) {
    if (err) {
      return res.send("Please Try Again");
    }
    const user = new UserModel({ email, password: hash });
    user.save();
    res.send("Signup Successful");
  });
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.send("Invalid Credentials");
  }
  const hashed_password = user.password;
  bcrypt.compare(password, hashed_password, async function (err, result) {
    if (result) {
      var token = jwt.sign(
        { email: user.email, userId: user._id },
        process.env.jwt_secret_key
      );
      return res.send({ massage: "Login Successful", token: token });
    } else {
      return res.send("Invalid Credentials");
    }
  });
});

module.exports = userRoute;
