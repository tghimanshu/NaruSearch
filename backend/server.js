const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

/* Utilies */
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

/* Routes */
app.use("/api", authRoutes);

/* Serving build folder as static */
app.use(express.static(path.join(__dirname, "../frontend/build")));
/* Serving Frontend */
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/", "index.html"));
});

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
