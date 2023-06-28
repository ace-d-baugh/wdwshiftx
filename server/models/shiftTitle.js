/*
=====================================================
; File Name: shiftTitle.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: Defines the schema for the shiftTitle collection.
=====================================================
*/

//imports for Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//shiftTitleSchema model for adding shiftTitles to db.
const shiftTitleSchema = new Schema(
  {
    shiftTitle: { type: String, unique: true },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    isDisabled: { type: Boolean, default: false },
  },
  { collection: "shiftTitles" }
);

//exporting the module.
module.exports = mongoose.model("ShiftTitle", shiftTitleSchema);
