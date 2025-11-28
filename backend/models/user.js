const mongoose = require("mongoose");
const Joi = require("joi");
const { date } = require("joi");

/**
 * Mongoose schema for the User model.
 * Defines the structure and validation rules for user documents in MongoDB.
 *
 * @type {mongoose.Schema}
 * @property {string} firstName - The first name of the user. Required.
 * @property {string} lastName - The last name of the user.
 * @property {string} email - The email address of the user. Required.
 * @property {string} password - The hashed password of the user. Required.
 * @property {Date} lastLogin - The timestamp of the user's last login. Defaults to current time.
 * @property {Object} timestamps - Automatically adds createdAt and updatedAt fields.
 */
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

/**
 * Mongoose model for the User collection.
 *
 * @type {mongoose.Model}
 */
const User = mongoose.model("User", userSchema);

/**
 * Joi validation schema for user registration.
 *
 * @type {Joi.ObjectSchema}
 * @property {string} firstName - The first name. Must be at least 1 character and contain only letters. Required.
 * @property {string} lastName - The last name. Must be at least 1 character and contain only letters.
 * @property {string} email - The email address. Must be a valid email and lowercase. Required.
 * @property {string} password - The password. Must be at least 3 characters. Required.
 */
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

/**
 * Joi validation schema for user login.
 *
 * @type {Joi.ObjectSchema}
 * @property {string} email - The email address. Must be a valid email and lowercase. Required.
 * @property {string} password - The password. Must be at least 3 characters. Required.
 */
const validateLogin = Joi.object({
  email: Joi.string().lowercase().email().required(),
  password: Joi.string().min(3).required(),
});

module.exports = {
  User,
  validateUser,
  validateLogin,
};
