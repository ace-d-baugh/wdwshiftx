/*
=====================================================
; File Name: role-api.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: Role API
=====================================================
*/

const express = require("express");
const router = express.Router();
const Ajv = require("ajv");
const ajv = new Ajv();
const Role = require("../models/role");
const {
  success,
  nullError,
  serverError,
  validationError
} = require("../logs/api-functions");

//Data validation schema for createRole api.
const createRoleSchema = {
  type: "object",
  properties: {
    role: {
      type: "string",
    },
  },
  required: ["role"],
  additionalProperties: false,
};

//Data validation schema for updateRole api.
const updateRoleSchema = {
  type: "object",
  properties: {
    role: {
      type: "string",
    },
  },
  required: ["role"],
  additionalProperties: false,
};

/*
=====================================================
; Find All Roles
=====================================================
*/

/*
=====================================================
; Find Role by id
=====================================================
*/

/*
=====================================================
; Create Role
=====================================================
*/

/*
=====================================================
; Update Role
=====================================================
*/

/*
=====================================================
; Delete Role (Disable)
=====================================================
*/

//Export module.
module.exports = router;
