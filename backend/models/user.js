const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: Text,
      required: true,
    },
    lastName: {
      type: Text,
      required: true,
    },
    email: {
      type: Text,
      required: true,
    },
    password: {
      type: Text,
      required: true,
    },
  },
  { timeStamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
