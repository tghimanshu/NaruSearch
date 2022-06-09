const express = require("express");
const { User, validateUser, validateLogin } = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/authUtils");
const jwt = require("jsonwebtoken");
const router = express.Router();

/* Auth Middleware */
function authMiddleWare(req, res, next) {
  try {
    // If token exists
    const token = req.header("auth-token");
    if (!token) return res.status(402).send("Access Denied");

    // Validating token
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifiedToken.id;
  } catch (error) {
    return res.status(500).json({
      success: false,
      body: error.messasge,
    });
  }
  next();
}

router.post("/login", async (req, res) => {
  try {
    //   Validation request body
    const results = validateLogin.validate(req.body);
    if (results.error)
      return res.status(400).json({
        success: false,
        body: results.error.message,
      });

    //   Getting the User
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user)
      return res.status(402).json({
        success: false,
        body: "Email is not Registered",
      });

    // Comparing Password
    const isValidPass = await comparePassword(req.body.password, user.password);
    if (!isValidPass)
      return res.status(402).send({
        success: false,
        body: "Invalid Password",
      });

    // Updating Last Login Data
    user.lastLogin = Date.now();
    await user.save();

    // generating token
    const token = jwt.sign(
      { name: `${user.firstName} ${user.lastName}`, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    user.password = undefined;
    return res.header("auth-token", token).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      body: error.message,
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    //   Validation request body
    const results = validateUser.validate(req.body);
    if (results.error)
      return res.status(400).json({
        success: false,
        body: results.error.message,
      });

    //   If Email Already Registered
    const alreadyExists = await User.findOne({ email: req.body.email }).exec();
    if (alreadyExists)
      return res.status(400).json({
        success: false,
        body: "Email Already Registered",
      });

    // Hashing Password and Creating the User
    req.body.password = await hashPassword(req.body.password);
    const user = new User(req.body);
    await user.save();
    user.password = undefined;

    // Generating Login Token
    const token = jwt.sign(
      { name: `${user.firstName} ${user.lastName}`, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.header("auth-token", token).json({
      success: true,
      body: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      body: error.message,
    });
  }
});

router.get("/:id", authMiddleWare, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
      .select("-password -_v")
      .exec();
    if (!user)
      return res.status(404).json({ success: false, body: "User Not Found" });
    return res.json({
      success: true,
      body: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      body: error.message,
    });
  }
});

router.get("/", authMiddleWare, (req, res) => {
  res.send("Hello");
});

module.exports = router;
