/*
=====================================================
; File Name: index.js
; Author: Ace Baugh1
; Date: 06/28/2023
; File Description: This is the main server file
=====================================================
*/

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// API Routes
const Users = require("./routes/user-api");
const Session = require("./routes/session-api");
const Ranks = require("./routes/rank-api");
const Roles = require("./routes/role-api");
const Property = require("./routes/property-api");
const Shifts = require("./routes/shift-api");

const app = express(); // Express variable.

dotenv.config(); // dotenv config function


/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist/wdwshiftx")));
app.use("/", express.static(path.join(__dirname, "../dist/wdwshiftx")));

// default server port value.
const PORT = process.env.PORT || 3000;

const CONN = process.env.MONGO_CONN;

/**
 * Database connection.
 */
mongoose
  .connect(CONN)
  .then(() => {
    console.log("Connection to the database was successful");

  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message);
  });


// API routes.
app.use("/api/users", Users);
app.use("/api/session", Session);
app.use("/api/ranks", Ranks);
app.use("/api/roles", Roles);
app.use("/api/property", Property);
app.use("/api/shifts", Shifts);

// Error handler for 404 errors
//app.use(function (req, res, next) {
//  res.redirect("/session/not-found");
//});

// Wire-up the Express server.
app.listen(PORT, () => {
  console.log("Application started and listening on PORT: " + PORT);
});
