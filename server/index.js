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

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const UserRoute = require("./routes/user-api");
const Session = require("./routes/session-api");
const Ranks = require("./routes/rank-api");
const Invoice = require("./routes/invoice-api");

const app = express(); // Express variable.

/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist/wdwshiftx")));
app.use("/", express.static(path.join(__dirname, "../dist/wdwshiftx")));

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
  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message);
  });

// Swagger API documentation options.
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BCRS API's",
      version: "1.0.0",
    },
  },
  apis: ["./server/routes/*.js"],
};

// Swagger specific options
const openapiSpecification = swaggerJsDoc(options);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

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
