/*
=====================================================
; File Name: rank.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: Defines the schema for the rank collection.
=====================================================
*/

//imports for Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//rankSchema model for adding ranks to db.
const rankSchema = new Schema(
  {
    rank: { type: String, unique: true },
    isDisabled: { type: Boolean, default: false },
  },
  { collection: "ranks" }
);

//exporting the module.
module.exports = mongoose.model("Rank", rankSchema);
