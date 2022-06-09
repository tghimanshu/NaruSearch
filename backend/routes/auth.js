const express = require("express");
const { User, validateUser, validateLogin } = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/authUtils");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    //   Validation request body
    const results = validateLogin.validate(req.body);
    if (results.error) return res.status(400).send(results.error.message);

    //   Getting the User
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) return res.status(402).send("Email is not Registered");

    // Comparing Password
    const isValidPass = await comparePassword(req.body.password, user.password);
    if (!isValidPass) return res.status(402).send("Invalid Email or Password");

    const token = jwt.sign(
      { name: `${user.firstName} ${user.lastName}`, id: user._id },
      process.env.JWT_SECRET
    );

    user.password = undefined;
    return res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    //   Validation request body
    const results = validateUser.validate(req.body);
    if (results.error) return res.status(400).send(results.error.message);

    //   If Email Already Registered
    const alreadyExists = await User.findOne({ email: req.body.email }).exec();
    if (alreadyExists) return res.status(400).send("Email Already Registered");

    // Hashing Password and Creating the User
    req.body.password = await hashPassword(req.body.password);
    const user = new User(req.body);
    await user.save();
    user.password = undefined;

    return res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
