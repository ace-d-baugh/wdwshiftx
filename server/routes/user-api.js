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
const Ajv = require("ajv");
const bcrypt = require("bcryptjs");
const Rank = require("../models/rank");
const saltRounds = 10;

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
