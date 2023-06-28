/*
=====================================================
; File Name: user-rank.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: This is the user rank schema
=====================================================
*/

// require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// user role schema
let userRankSchema = new Schema({
  text: { type: String, default: "guest" },
});

module.exports = userRankSchema;
