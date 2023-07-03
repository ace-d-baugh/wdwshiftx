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
