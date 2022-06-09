const mongoose = require("mongoose");
const Joi = require("joi");
const { date } = require("joi");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

const validateUser = Joi.object({
  firstName: Joi.string()
    .min(1)
    .pattern(/[A-Za-z]*/)
    .required(),
  lastName: Joi.string()
    .min(1)
    .pattern(/[A-Za-z]*/),
  email: Joi.string().lowercase().email().required(),
  password: Joi.string().min(3).required(),
});

const validateLogin = Joi.object({
  email: Joi.string().lowercase().email().required(),
  password: Joi.string().min(3).required(),
});

module.exports = {
  User,
  validateUser,
  validateLogin,
};
