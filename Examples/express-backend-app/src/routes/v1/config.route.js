const express = require("express");
const router = express.Router();
const configController = require("../../controllers/config.controller");

const validateSchema = require("../../middleware/validateSchema.middleware");
const configValidation = require("../../validations/config.validation");

// http://localhost:8686/api/v1/configs
router.get("/", configController.getAll);

// http://localhost:8686/api/v1/configs/:id
router.get("/:id", validateSchema(configValidation.getById), configController.getById);

// http://localhost:8686/api/v1/configs
router.post("/", validateSchema(configValidation.create), configController.create);

// http://localhost:8686/api/v1/configs/:id
router.put("/:id", validateSchema(configValidation.updateById), configController.updateById);

// http://localhost:8686/api/v1/configs/:id
router.delete("/:id", validateSchema(configValidation.deleteById), configController.deleteById);

module.exports = router;
