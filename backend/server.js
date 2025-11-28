const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Express application instance.
 * @type {express.Application}
 */
const app = express();

/* Utilies */
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

/* Routes */
/**
 * Mounts authentication routes under the /api path.
 */
app.use("/api", authRoutes);

/* Serving build folder as static */
app.use(express.static(path.join(__dirname, "../frontend/build")));

/* Serving Frontend */
/**
 * Serves the frontend React application for any unmatched routes.
 * This allows client-side routing to work.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/", "index.html"));
});

/* MongoDB Connection */
/**
 * Connects to the MongoDB database using the URI from environment variables.
 */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

/**
 * The port number the server will listen on.
 * Defaults to 8000 if not specified in environment variables.
 * @type {number|string}
 */
const PORT = process.env.PORT || 8000;

/**
 * Starts the server and listens on the specified port.
 */
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
