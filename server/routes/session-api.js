/*
=====================================================
; File Name: session-api.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: Session API
=====================================================
*/

const express = require("express");
const router = express.Router();
const Ajv = require("ajv");
const ajv = new Ajv();
const bcrypt = require("bcryptjs");  //Encrypts Password
const saltRounds = 10;  // Hashes Password
const User = require("../models/user");
const {
  success,
  nullError,
  serverError,
  validationError,
  authenticationError,
  disabledError
} = require("../logs/api-functions");


//Data validation schemas
const sessionSigninSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};


/*
=====================================================
; User Sign In
=====================================================
*/
router.post("/signin", async (req, res) => {
  const apiCall = "signin"
  try {

    let userSignin = req.body;

    // Checks request body against the schema
    const validator = ajv.compile(sessionSigninSchema);
    const valid = validator(userSignin);

    // Failed validation
    if (!valid) {
      const response = validationError(apiCall, req.body.email);
      res.status(400).send(response.toObject());
      return;
    }

    // findOne function to find a user by email
    User.findOne({ email: req.body.email })
      .then((user) => {

      //  Invalid email
      if (!user) {
        const response = authenticationError(apiCall, req.body.email);
        res.status(401).send(response.toObject());
          return
      }

      // If account is disabled
      if (user.isDisabled === true) {
        const response = disabledError(apiCall, req.body.email);
        res.status(403).send(response.toObject());
        return
      }

      // Compare the string password with the hashed password in the database
      if (user) {
        console.log(user);
        let passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        // Invalid password
        if (!passwordIsValid) {
          const response = authenticationError(apiCall, req.body.email);
          res.status(401).send(response.toObject());
          return
        }

        // Valid password and successful signin
        const response = success(apiCall, user);
        res.json(response.toObject());
        return
      }
    })

    // Not Found Error
    .catch((undefined) => {
      const response = nullError(apiCall, undefined);
      res.status(404).send(response.toObject());
    })

    // Server Error
    .catch((err) => {
      const response = serverError(apiCall, err);
      res.status(500).send(response.toObject());
    })

  // MongoDB Error
  } catch (e) {
    const response = serverError(apiCall, e.message)
    res.status(501).send(response.toObject());
  }
});

/*
=====================================================
; Register New User
=====================================================
*/
const registerUserSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    phone: { type: "string" },
  },
  required: ["email", "password", "firstName", "lastName", "phone"],
  additionalProperties: false,
};

/*
=====================================================
; Verify User
=====================================================
*/

/*
=====================================================
; Reset Password
=====================================================
*/

//Export module.
module.exports = router;
