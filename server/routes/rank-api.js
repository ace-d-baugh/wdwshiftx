/*
=====================================================
; File Name: rank-api.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: Rank API
=====================================================
*/

const express = require("express");
const router = express.Router();
const Ajv = require("ajv");
const ajv = new Ajv();
const Rank = require("../models/rank");
const {
  success,
  nullError,
  serverError,
  validationError,
  duplicationError
} = require("../logs/api-functions");

// Data validation schema for createRank and updateRank
const rankSchema = {
  type: "object",
  properties: {
    rank: {
      type: "string",
    },
  },
  required: ["rank"],
  additionalProperties: false,
};


/*
=====================================================
; Find All Ranks
=====================================================
*/
router.get("/", async (req, res) => {
  const apiCall = "findAllRanks";
  try {

    // find function to find all Rank objects where the isDisabled field is set to false
    Rank.find({})
      .where("isDisabled")
      .equals(false)
      .then((rank) => {

        // Successful Query
        const response = success(apiCall, rank);
        res.json(response.toObject());
      })

      // Server Error
      .catch((err) => {
        const response = serverError(apiCall, err);
        res.status(500).send(response.toObject());
      })

  // MongoDB error
  } catch (e) {
    const response = serverError(apiCall, e.message);
    res.status(501).send(response.toObject());
  }
});


/*
=====================================================
; Find Rank by id
=====================================================
*/
router.get("/:id", async (req, res) => {
  const apiCall = "findRankById";
  try {
    Rank.findById(req.params.id)
      .then((rank) => {

        // Successful Query
        const response = success(apiCall, rank);
        res.json(response.toObject());
      })

      // Not Found Error
      .catch((undefined) => {
        const response = nullError(apiCall, undefined);
        res.status(404).send(response.toObject());
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
; Create Rank
=====================================================
*/
router.post("/", async (req, res) => {
  const apiCall = "createRank";
  try {

    // rank object from the request body
    let newRank = req.body;

    // Checks current request body against the schema
    const validator = ajv.compile(rankSchema);
    const valid = validator(newRank);

    // If invalid return 400 Error
    if (!valid) {
      const response = validationError(apiCall, req.body.rank);
      res.status(400).send(response.toObject());
      return;
    }

    // Attempts to find rank by id
    Rank.findOne({ rank: req.body.rank })
      .then((rank) => {

        if (rank) {
          const response = duplicationError(apiCall, req.body.rank);
          res.status(401).send(response.toObject());
          return
        }

        // Creates the rank object with user input
        let createdRank = {
          rank: req.body.rank,
        }

        // Attempts to save the created rank object to the database
        Rank.create(createdRank)
          // Success
          .then((rank) => {
            const response = success(apiCall, rank);
            res.json(response.toObject());
          })
          // Error
          .catch((err) => {
            const response = serverError(apiCall, err);
            res.status(500).send(response.toObject());
          })
      })

      // Not Found Error
      .catch((undefined) => {
        const response = nullError(apiCall, undefined);
        res.status(404).send(response.toObject());
      })

      // Server Error
      .catch((err) => {
        const response = serverError(apiCall, err);
        res.status(500).send(response.toObject());
      })

    // MongoDB Error
  } catch (e) {
    const response = serverError(apiCall, e.message);
    res.status(501).send(response.toObject());
  }
});


/*
=====================================================
; Update Rank
=====================================================
*/
router.put("/:id", async (req, res) => {
  const apiCall = "updateRank";
  try {

    // Rank object from the request body
    let updatedRank = req.body;

    // Checks current request body against the schema
    const validator = ajv.compile(rankSchema);
    const valid = validator(updatedRank);

    // If invalid return 400 Error
    if (!valid) {
      const response = validationError(apiCall, req.body.rank);
      res.status(400).send(response.toObject());
      return;
    }

    // Attempts to find rank by id
    Rank.findById(req.params.id)
      .then((rank) => {

        // Updates the rank object with user input
        rank.set({
          rank: req.body.rank,
        });

        // Attempts to save the updated rank object to the database
        rank.save()
          // Success
          .then((rank) => {
            const response = success(apiCall, rank);
            res.json(response.toObject());
          })
          // Error
          .catch((err) => {
            const response = serverError(apiCall, err);
            res.status(500).send(response.toObject());
          })
      })

      // Not Found Error
      .catch((undefined) => {
        const response = nullError(apiCall, undefined);
        res.status(404).send(response.toObject());
      })

      // Server Error
      .catch((err) => {
        const response = serverError(apiCall, err);
        res.status(500).send(response.toObject());
      })

    // MongoDB Error
  } catch (e) {
    const response = serverError(apiCall, e.message);
    res.status(501).send(response.toObject());
  }
});


/*
=====================================================
; Delete Rank (Disable)
=====================================================
*/
router.post("/delete/:id", async (req, res) => {
  const apiCall = "deleteRank";
  try {
    Rank.findById(req.params.id)
      .where("isDisabled")
      .equals(false)
      .then((rank) => {

        // Successful Query
        rank.isDisabled = true;
        rank.save()
          .then((rank) => {
            const response = success(apiCall, rank);
            res.json(response.toObject());
          })
          .catch((err) => {
            const response = serverError(apiCall, err);
            res.status(500).send(response.toObject());
          })
      })

      // Not Found Error
      .catch((undefined) => {
        const response = nullError(apiCall, undefined);
        res.status(404).send(response.toObject());
      })

      // Server Error
      .catch((err) => {
        const response = serverError(apiCall, err);
        res.status(500).send(response.toObject());
      })

    // Internal Server Error
  } catch (e) {
    const response = serverError(apiCall, e.message);
    res.status(501).send(response.toObject());
  }
});


//Export module.
module.exports = router;
