/*
=====================================================
; File Name: shift-api.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: Shift API
=====================================================
*/

const express = require("express");
const Shift = require("../models/shift");
const Ajv = require("ajv");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

//Data validation schema for createShift api.
const createShiftSchema = {
  type: "object",
  properties: {
    shiftTitle: {
      type: "string",
    },
    startTime: {
      type: "Date",
    },
    endTime: {
      type: "Date",
    },
    role: {
      type: "string",
    },
    property: {
      type: "string",
    },
    owner: {
      type: "string",
    },
    isTradeable: {
      type: "boolean",
    },
    isGiveable: {
      type: "boolean",
    },
    isOvertime: {
      type: "boolean",
    },
    comments: {
      type: "string",
    },
  },
  required: ["shiftTitle", "startTime", "endTime", "role", "property", "owner", "isTradeable", "isGiveable", "isOvertime"],
  additionalProperties: false,
};

//Data validation schema for updateShift api.
const updateShiftSchema = {
  type: "object",
  properties: {
    shiftTitle: {
      type: "string",
    },
    startTime: {
      type: "Date",
    },
    endTime: {
      type: "Date",
    },
    role: {
      type: "string",
    },
    property: {
      type: "string",
    },
    owner: {
      type: "string",
    },
    isTradeable: {
      type: "boolean",
    },
    isGiveable: {
      type: "boolean",
    },
    isOvertime: {
      type: "boolean",
    },
    comments: {
      type: "string",
    },
  },
  required: ["shiftTitle", "startTime", "endTime", "role", "property", "owner", "isTradeable", "isGiveable", "isOvertime"],
  additionalProperties: false,
};

/*
=====================================================
; Find All Shifts
=====================================================
*/

/*
=====================================================
; Find Shift by id
=====================================================
*/

/*
=====================================================
; Create Shift
=====================================================
*/

/*
=====================================================
; Update Shift
=====================================================
*/

/*
=====================================================
; Delete Shift
=====================================================
*/

/*
=====================================================
; Find Shifts by Role ?
=====================================================
*/

/*
=====================================================
; Find Shifts by Property ?
=====================================================
*/

/*
=====================================================
; Find Shifts by Date ?
=====================================================
*/

//Export module.
module.exports = router;
