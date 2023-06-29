/*
=====================================================
; File Name: property-api.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: Property API
=====================================================
*/

const express = require("express");
const Property = require("../models/property");
const Ajv = require("ajv");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

//Data validation schema for createProperty api.
const createPropertySchema = {
  type: "object",
  properties: {
    property: {
      type: "string",
    },
  },
  required: ["property"],
  additionalProperties: false,
};

//Data validation schema for updateProperty api.
const updatePropertySchema = {
  type: "object",
  properties: {
    property: {
      type: "string",
    },
  },
  required: ["property"],
  additionalProperties: false,
};

/*
=====================================================
; Find All Properties
=====================================================
*/

/*
=====================================================
; Find Property by id
=====================================================
*/

/*
=====================================================
; Create Property
=====================================================
*/

/*
=====================================================
; Update Property
=====================================================
*/

/*
=====================================================
; Delete Property (Disable)
=====================================================
*/

//Export module.
module.exports = router;
