/*
=====================================================
; File Name: role.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: Defines the schema for the role collection.
=====================================================
*/

//imports for Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//roleSchema model for adding roles to db.
const roleSchema = new Schema(
  {
    role: { type: String, unique: true },
    isDisabled: { type: Boolean, default: false },
    createdBy: { type: String },
    modifiedBy: { type: String },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date },
  },
  { collection: "roles" }
);

//exporting the module.
module.exports = mongoose.model("Role", roleSchema);
