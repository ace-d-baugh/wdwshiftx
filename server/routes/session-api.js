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
  disabledError,
  duplicationError
} = require("../logs/api-functions");


// Schema for signin
const sessionSigninSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

// Schema for registration
const registerSchema = {
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

// Schema for password validation
const resetPasswordSchema = {
  type: "object",
  properties: {
    password: { type: "string" },
  },
  required: ["password"],
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








// Under Construction  // Under Construction  // Under Construction  // Under Construction  // Under Construction  // Under Construction  // Under Construction

router.post("/register", async (req, res) => {
  const apiCall = "register";
  try {

    // User object from the request body
    let registration = req.body;

    // Checks current request body against the schema
    const validator = ajv.compile(registerSchema);
    const valid = validator(registration);

    // If invalid return 400 Error
    if (!valid) {
      const response = validationError(apiCall, registration);
      res.status(400).send(response.toObject());
      return;
    }

    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

    // Saves the registration in an object
    let newRegistration = {
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone
    };

    // Attempts to save the registration to the database
    User.create(newRegistration)
      .then((user) => {

        const response = success(apiCall, user);
        res.json(response.toObject());
      })

      // Server Error
      .catch((err) => {
        const response = serverError(apiCall, err);
        res.status(500).send(response.toObject());
      })

      // Email already in Use Error
      .catch((err) => {
        const response = duplicationError(apiCall, newRegistration.email);  // This block of code needs to be moved after getting the function to work properly
        res.status(401).send(response.toObject());
      })

    // MongoDB Error
  } catch (e) {
    const response = serverError(apiCall, e.message)
    res.status(501).send(response.toObject());
  }
});






// Construction End  // Construction End  // Construction End  // Construction End  // Construction End  // Construction End  // Construction End

/*
=====================================================
; Verify User
=====================================================
*/
router.get("/verify/:email", async (req, res) => {
  const apiCall = "verifyUser";
  try {
    User.findOne({ email: req.params.email })
      .then((user) => {

        // If database returns null
        if (user === null) {
          const response = nullError(apiCall, req.params.email);
          res.status(404).send(response.toObject());
          return
        }

        // Successful Query
        const response = success(apiCall, user);
        res.json(response.toObject());
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
; Reset Password
=====================================================
*/
router.post("/reset-password/:email", async (req, res) => {
  const apiCall = "resetPassword";
  try {

    // Checks current request body against the schema
    let newPassword = req.body;
    const validator = ajv.compile(resetPasswordSchema);
    const valid = validator(newPassword);

    // If invalid return 400 Error
    if (!valid) {
      const response = validationError(apiCall, newPassword);
      res.status(400).send(response.toObject());
      return;
    }

    // Attempts to find user by id
    User.findOne({ email: req.params.email })
      .then((user) => {

        // If database returns null
        if (user === null) {
          const response = nullError(apiCall, req.params.email);
          res.status(404).send(response.toObject());
          return
        }

        password = req.body.password
        let hashedPassword = bcrypt.hashSync(password, saltRounds);
        user.set({ password: hashedPassword });

        // Attempts to save the updated user password to the database
        user.save()
          // Success
          .then((user) => {
            const response = success(apiCall, user);
            res.json(response.toObject());
          })
          // Error
          .catch((err) => {
            const response = serverError(apiCall, err);
            res.status(500).send(response.toObject());
          })
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


//Export module.
module.exports = router;
