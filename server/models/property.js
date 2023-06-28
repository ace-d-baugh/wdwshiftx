/*
=====================================================
; File Name: property.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: Defines the schema for the property collection.
=====================================================
*/

//imports for Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//propertySchema model for adding properties to db.
const propertySchema = new Schema(
  {
    property: { type: String, unique: true },
    isDisabled: { type: Boolean, default: false },
  },
  { collection: "properties" }
);

//exporting the module.
module.exports = mongoose.model("Property", propertySchema);
