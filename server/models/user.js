/*
=====================================================
; File Name: user.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: Defines the schema for the user collection.
=====================================================
*/

//imports for Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//userSchema model for adding users to db.
const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true }, // This is the username
    password: { type: String, unique: true, required: true }, 
    firstName: { type: String, unique: true, required: true },
    lastName: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    rank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rank",
      required: true,
    },
    proficiencies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShiftTitle",
        required: true,
      },
    ],
    shifts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    createdDate: {
      type: Date,
      default: Date.now,
    },
    modifiedDate: {
      type: Date,
    },
    isDisabled: { type: Boolean, default: false },
  },
  { collection: "users" }
);

//exporting the module.
module.exports = mongoose.model("User", userSchema);
