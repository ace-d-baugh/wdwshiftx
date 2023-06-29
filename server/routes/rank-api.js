/*
=====================================================
; File Name: rank-api.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: Rank API
=====================================================
*/

const express = require("express");
const Rank = require("../models/rank");
const Ajv = require("ajv");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

//Data validation schema for createRank api.
const createRankSchema = {
  type: "object",
  properties: {
    rank: {
      type: "string",
    },
  },
  required: ["rank"],
  additionalProperties: false,
};

//Data validation schema for updateRank api.
const updateRankSchema = {
  type: "object",
  properties: {
    rank: {
      type: "string",
    },
  },
  required: ["rank"],
  additionalProperties: false,
};

/*
=====================================================
; Find All Ranks
=====================================================
*/

/*
=====================================================
; Find Rank by id
=====================================================
*/

/*
=====================================================
; Create Rank
=====================================================
*/

/*
=====================================================
; Update Rank
=====================================================
*/

/*
=====================================================
; Delete Rank (Disable)
=====================================================
*/

//Export module.
module.exports = router;
