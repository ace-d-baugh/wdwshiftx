/*
=====================================================
; File Name: user-api.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: User API
=====================================================
*/

const express = require("express");
const User = require("../models/user");
const {
  debugLogger, errorLogger, ServerResponse
} = require("../logs/server-response");
const Ajv = require("ajv");
const bcrypt = require("bcryptjs");
const Rank = require("../models/rank");
const saltRounds = 10;
const fileName = "user-api.js";

/*
=====================================================
; Server Responses
=====================================================
*/

// Success Response
function successResponse(responseData) {
  debugLogger({
    filename: fileName,
    message: "Successful Query",
    item: responseData
  });
  const response = new ServerResponse(
    200,
    "Query Successful",
    responseData
  );
}

// Null Response
function nullResponse(responseData) {
  errorLogger({
    filename: fileName,
    message: "Object or Path not found",
    item: responseData
  });
  const response = new ServerResponse(
    404,
    "Object or Path not found",
    responseData
  );
}

// Server Error Response
function serverErrorResponse(responseData) {
  errorLogger({
    filename: fileName,
    message: "Server Error",
    item: responseData
  });
  const response = new ServerResponse(
    500,
    "Server Error",
    responseData
  );
}

// Validation Error Response
function validationErrorResponse(responseData) {
  errorLogger({
    filename: fileName,
    message: "Unable to validate data",
    item: responseData
  });
  const response = new ServerResponse(
    400,
    "Unable to validate data",
    responseData
  );
}

//Data validation schema for updateUser api.
const updateUserSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    phone: {
      type: "string",
    },
    rank: {
      type: "string",
    },
  },
  required: ["email","firstName", "lastName", "phone", "rank"],
  additionalProperties: false,
};

/*
=====================================================
; Find All Users
=====================================================
*/
router.get("/", async (req, res) => {
  try {
    User.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (err, users) {

        // 404 error if null values
        if (users === null) {
          nullResponse(err);
          res.status(404).send(response.toObject());
          return;
        }

        // Server Error
        if (err) {
          serverErrorResponse(err);
          res.status(500).send(response.toObject());
          return;
        }

        // Successful Query
        successResponse(users);
        res.json(response.toObject());
      });

    // Server Error
  } catch (e) {
    serverErrorResponse(e.message)
    res.status(500).send(response.toObject());
  }
});


/*
=====================================================
; Find User by id
=====================================================
*/


/*
=====================================================
; Update User
=====================================================
*/


/*
=====================================================
; Delete User (Disable)
=====================================================
*/


/*
=====================================================
; Find User Shifts
=====================================================
*/


/*
=====================================================
; Find User Rank
=====================================================
*/


/*
=====================================================
; Find User Proficiencies (Array of ShiftTitles)
=====================================================
*/

//Export module.
module.exports = router;
