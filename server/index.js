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


//const UserRoute = require("./routes/user-api");
//const Session = require("./routes/session-api");
//const Ranks = require("./routes/rank-api");
//const Invoice = require("./routes/invoice-api");

const app = express(); // Express variable.

/*
-----------------------------------------------------
; This is just here to test the connection to the db.
-----------------------------------------------------
*/
const rankSchema = new mongoose.Schema({
  rank: { type: String, unique: true },
  isDisabled: { type: Boolean, default: false },
});
const Rank = mongoose.model("Rank", rankSchema);
/*
-----------------------------------------------------
; This is the end of the test.
-----------------------------------------------------
*/


/**
 * App configurations.
 */
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, "../dist/wdwshiftx")));
//app.use("/", express.static(path.join(__dirname, "../dist/wdwshiftx")));

// default server port value.
const PORT = process.env.PORT || 3000;

const CONN =
  "mongodb+srv://shiftx_admin:WDWSh!ftXS3cret@wdwshiftx.8ey3dwj.mongodb.net/WDWShiftX?retryWrites=true&w=majority";

/**
 * Database connection.
 */
mongoose
  .connect(CONN)
  .then(() => {
    console.log("Connection to the database was successful");

    // list the ranks in the ranks collection.
    Rank.find({}).then((data) => {
      console.log(data);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message);
  });


// API routes.
//app.use("/api/users", UserRoute);
//app.use("/api/session", Session);
//app.use("/api/rank", Ranks);

// Error handler for 404 errors
//app.use(function (req, res, next) {
//  res.redirect("/session/not-found");
//});

// Wire-up the Express server.
app.listen(PORT, () => {
  console.log("Application started and listening on PORT: " + PORT);
});
