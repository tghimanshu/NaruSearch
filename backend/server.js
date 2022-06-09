const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();

/* Utilies */
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

/* Routes */
app.use(authRoutes);
app.get("/", (req, res) => {
  res.send("Hello");
});

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));