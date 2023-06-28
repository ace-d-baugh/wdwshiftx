/*
=====================================================
; File Name: shift.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: Defines the schema for the shift collection.
=====================================================
*/

//imports for Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//shiftSchema model for adding shifts to db.
const shiftSchema = new Schema(
  {
    shiftTitle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShiftTitle",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
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
    createdDate: {
      type: Date,
      default: Date.now,
    },
    modifiedDate: {
      type: Date,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isTradeable: {
      type: Boolean,
      default: false,
    },
    isGiveable: {
      type: Boolean,
      default: false,
    },
    isOvertime: {
      type: Boolean,
      default: false,
    },
    comments: {
      type: String,
    },
  },
  { collection: "shifts" }
);

//exporting the module.
module.exports = mongoose.model("Shift", shiftSchema);
