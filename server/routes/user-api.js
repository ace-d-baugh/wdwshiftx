/*
=====================================================
; File Name: user-api.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: User API
=====================================================
*/

const express = require("express");
const router = express.Router();
const Ajv = require("ajv");
const ajv = new Ajv();
const User = require("../models/user");
const Rank = require("../models/rank");
const {
  success,
  nullError,
  serverError,
  validationError
} = require("../logs/api-functions");


//Data validation schema for updateUser api.
const updateUserSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    phone: {
      type: "string",
    },
    rank: {
      type: "object",
      properties: {
        rank: {
          type: "string",
        }
      },
    },
  },
  required: ["email","firstName", "lastName", "phone", "rank"],
  additionalProperties: false,
};


/*
=====================================================
; Find All Users
=====================================================
*/
router.get("/", async (req, res) => {
  const apiCall = "findAllUsers";
  try {
    User.find({})
      .where("isDisabled")
      .equals(false)
      .then((users) => {

        // Successful Query
        const response = success(apiCall, users);
        res.json(response.toObject());
      })

      // Server Error
      .catch((err) => {
        const response = serverError(apiCall, err);
        res.status(500).send(response.toObject());
      })

    // MongoDB Error
  } catch (e) {
    const response = serverError(apiCall, e.message)
    res.status(501).send(response.toObject());
  }
});


/*
=====================================================
; Find User by id
=====================================================
*/
router.get("/:id", async (req, res) => {
  const apiCall = "findUserById";
  try {
    User.findById(req.params.id)
      .then((user) => {

        // Successful Query
        const response = success(apiCall, user);
        res.json(response.toObject());
      })

      // Not Found Error
      .catch((err) => {
        const response = nullError(apiCall, err);
        res.status(404).send(response.toObject());
      })

    // MongoDB Error
  } catch (e) {
    const response = serverError(apiCall, e.message)
    res.status(501).send(response.toObject());
  }
});

/*
=====================================================
; Update User
=====================================================
*/


/*
=====================================================
; Delete User (Disable)
=====================================================
*/
router.post("/delete/:id", async (req, res) => {
  try {
    User.findById(req.params.id)
      .where("isDisabled")
      .equals(false)
      .then((user) => {

        // Successful Query
        if (user) {
          user.isDisabled = true;
          user.save()
            .then((user) => {
              const response = successResponse(user);
              res.json(response.toObject());
            })
            .catch((err) => {
              const response = serverErrorResponse(err);
              res.status(500).send(response.toObject());
            })
        }

        // Null Response
        else {
          const response = nullResponse(user);
          res.status(404).send(response.toObject());
        }

      // Server Error
      }).catch((err) => {
        const response = serverErrorResponse(err);
        res.status(500).send(response.toObject());
      })

    // Internal Server Error
  } catch (e) {
    const response = serverErrorResponse(e.message)
    res.status(501).send(response.toObject());
  }
});


/*
=====================================================
; Find User Shifts
=====================================================
*/


/*
=====================================================
; Find User Rank
=====================================================
*/

router.get("/rank/:id", async (req, res) => {
  try {
    User.findById(req.params.id)
      .where("isDisabled")
      .equals(false)
      .then((user) => {

        // Successful Query
        if (user) {
          Rank.findById(user.rank)
            .then((rank) => {
              const response = successResponse(rank);
              res.json(response.toObject());
            })
            .catch((err) => {
              const response = serverErrorResponse(err);
              res.status(500).send(response.toObject());
            })
        }

        // Null Response
        else {
          const response = nullResponse(user);
          res.status(404).send(response.toObject());
        }

      // Server Error
      }).catch((err) => {
        const response = serverErrorResponse(err);
        res.status(500).send(response.toObject());
      })

    // Internal Server Error
  } catch (e) {
    const response = serverErrorResponse(e.message)
    res.status(501).send(response.toObject());
  }
});

/*
=====================================================
; Find User Proficiencies (Array of ShiftTitles)
=====================================================
*/

//Export module.
module.exports = router;
