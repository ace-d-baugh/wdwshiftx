/*
=====================================================
; File Name: property-api.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: Property API
=====================================================
*/

const express = require("express");
const router = express.Router();
const Ajv = require("ajv");
const ajv = new Ajv();
const Property = require("../models/property");
const {
  success,
  nullError,
  serverError,
  validationError
} = require("../logs/api-functions");

//Data validation schema for createProperty api.
const createPropertySchema = {
  type: "object",
  properties: {
    property: {
      type: "string",
    },
    createdBy: {
      type: "string",
    },
  },
  required: ["property", "createdBy"],
  additionalProperties: false,
};

//Data validation schema for updateProperty api.
const updatePropertySchema = {
  type: "object",
  properties: {
    property: {
      type: "string",
    },
    modifiedBy: {
      type: "string",
    },
  },
  required: ["property", "modifiedBy"],
  additionalProperties: false,
};

/*
=====================================================
; Find All Properties
=====================================================
*/
router.get("/", async (req, res) => {
  const apiCall = "findAllProperties";
  try {

    // find function to find all Property objects where the isDisabled field is set to false
    Property.find({})
      .where("isDisabled")
      .equals(false)
      .then((property) => {

        // Successful Query
        const response = success(apiCall, property);
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
; Find Property by id
=====================================================
*/
router.get("/:id", async (req, res) => {
  const apiCall = "findPropertyById";
  try {
    Property.findById(req.params.id)
      .then((property) => {

        // Successful Query
        const response = success(apiCall, property);
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
; Create Property
=====================================================
*/
router.post("/", async (req, res) => {
  const apiCall = "createProperty";
  try {

    // Property object from the request body
    let newProperty = req.body;

    // Checks current request body against the schema
    const validator = ajv.compile(createPropertySchema);
    const valid = validator(newProperty);

    // If invalid return 400 Error
    if (!valid) {
      const response = validationError(apiCall, req.body.property);
      res.status(400).send(response.toObject());
      return;
    }

    // Attempts to find property by id
    Property.findOne({ property: req.body.property })
      .then((property) => {

        if (property) {
          const response = duplicationError(apiCall, req.body.property);
          res.status(401).send(response.toObject());
          return
        }

        // Creates the property object with user input
        let createdProperty = {
          property: req.body.property,
          createdBy: req.body.createdBy,
          createdDate: new Date()
        }

        // Attempts to save the created property object to the database
        Property.create(createdProperty)
          // Success
          .then((property) => {
            const response = success(apiCall, property);
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
; Update Property
=====================================================
*/
router.put("/:id", async (req, res) => {
  const apiCall = "updateProperty";
  try {

    // Property object from the request body
    let updatedProperty = req.body;

    // Checks current request body against the schema
    const validator = ajv.compile(updatePropertySchema);
    const valid = validator(updatedProperty);

    // If invalid return 400 Error
    if (!valid) {
      const response = validationError(apiCall, req.body.property);
      res.status(400).send(response.toObject());
      return;
    }

    // Attempts to find property by id
    Property.findById(req.params.id)
      .then((property) => {

        // Updates the property object with user input
        property.set({
          property: req.body.property,
          modifiedBy: req.body.modifiedBy,
          modifiedDate: new Date(),
        });

        // Attempts to save the updated property object to the database
        property.save()
          // Success
          .then((property) => {
            const response = success(apiCall, property);
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
; Delete Property (Disable)
=====================================================
*/
router.post("/delete/:id", async (req, res) => {
  const apiCall = "deleteProperty";
  try {
    Property.findById(req.params.id)
      .where("isDisabled")
      .equals(false)
      .then((property) => {

        // Successful Query
        property.isDisabled = true;
        property.save()
          .then((property) => {
            const response = success(apiCall, property);
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
