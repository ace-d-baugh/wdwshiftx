/*
=====================================================
; File Name: role-api.js
; Author: Ace Baugh
; Date: 06/28/2023
; File Description: Role API
=====================================================
*/

const express = require("express");
const router = express.Router();
const Ajv = require("ajv");
const ajv = new Ajv();
const Role = require("../models/role");
const {
  success,
  nullError,
  serverError,
  validationError,
  duplicationError
} = require("../logs/api-functions");

//Data validation schema for createRole api.
const createRoleSchema = {
  type: "object",
  properties: {
    role: {
      type: "string",
    },
    createdBy: {
      type: "string",
    },
  },
  required: ["role", "createdBy"],
  additionalProperties: false,
};

//Data validation schema for updateRole api.
const updateRoleSchema = {
  type: "object",
  properties: {
    role: {
      type: "string",
    },
    modifiedBy: {
      type: "string",
    },
  },
  required: ["role", "modifiedBy"],
  additionalProperties: false,
};

/*
=====================================================
; Find All Roles
=====================================================
*/
router.get("/", async (req, res) => {
  const apiCall = "findAllRoles";
  try {

    // find function to find all Role objects where the isDisabled field is set to false
    Role.find({})
      .where("isDisabled")
      .equals(false)
      .then((roles) => {

        // Successful Query
        const response = success(apiCall, roles);
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
; Find Role by id
=====================================================
*/
router.get("/:id", async (req, res) => {
  const apiCall = "findRoleById";
  try {
    Role.findById(req.params.id)
      .then((role) => {

        // Successful Query
        const response = success(apiCall, role);
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
; Create Role
=====================================================
*/
router.post("/", async (req, res) => {
  const apiCall = "createRole";
  try {

    // Role object from the request body
    let newRole = req.body;

    // Checks current request body against the schema
    const validator = ajv.compile(createRoleSchema);
    const valid = validator(newRole);

    // If invalid return 400 Error
    if (!valid) {
      const response = validationError(apiCall, newRole);
      res.status(400).send(response.toObject());
      return;
    }

    // Attempts to find role by id
    Role.findOne({ role: req.body.role })
      .then((role) => {

        if (role) {
          const response = duplicationError(apiCall, req.body.role);
          res.status(401).send(response.toObject());
          return
        }

        // Creates the role object with user input
        let createdRole = {
          role: req.body.role,
          createdBy: req.body.createdBy,
          createdDate: new Date()
        }

        // Attempts to save the created role object to the database
        Role.create(createdRole)
          // Success
          .then((role) => {
            const response = success(apiCall, role);
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
; Update Role
=====================================================
*/
router.put("/:id", async (req, res) => {
  const apiCall = "updateRole";
  try {

    // Role object from the request body
    let updatedRole = req.body;

    // Checks current request body against the schema
    const validator = ajv.compile(updateRoleSchema);
    const valid = validator(updatedRole);

    // If invalid return 400 Error
    if (!valid) {
      const response = validationError(apiCall, updatedRole);
      res.status(400).send(response.toObject());
      return;
    }

    // Attempts to find role by id
    Role.findById(req.params.id)
      .then((role) => {

        // Updates the role object with user input
        role.set({
          role: req.body.role,
          modifiedBy: req.body.modifiedBy,
          modifiedDate: new Date(),
        });

        // Attempts to save the updated role object to the database
        role.save()
          // Success
          .then((role) => {
            const response = success(apiCall, role);
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
; Delete Role (Disable)
=====================================================
*/
router.post("/delete/:id", async (req, res) => {
  const apiCall = "deleteRole";
  try {
    Role.findById(req.params.id)
      .where("isDisabled")
      .equals(false)
      .then((role) => {

        // Successful Query
        role.isDisabled = true;
        role.save()
          .then((role) => {
            const response = success(apiCall, role);
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
