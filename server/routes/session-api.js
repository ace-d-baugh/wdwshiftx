/*
=====================================================
; File Name: session-api.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: Session API
=====================================================
*/

const express = require("express");
const User = require("../models/user");
const Ajv = require("ajv");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const router = express.Router();

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
