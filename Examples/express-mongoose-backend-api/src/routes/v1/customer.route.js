const express = require("express");
const router = express.Router();
const customerController = require("../../controllers/customer.controller");

const validateSchema = require("../../middleware/validateSchema.middleware");
const customerValidation = require("../../validations/customer.validation");

// http://localhost:8686/api/v1/customers
router.get("/", customerController.getAll);

// http://localhost:8686/api/v1/customers/:id
router.get("/:id", validateSchema(customerValidation.getById), customerController.getById);

// http://localhost:8686/api/v1/customers
router.post("/", validateSchema(customerValidation.create), customerController.create);

// http://localhost:8686/api/v1/customers/:id
router.put("/:id", validateSchema(customerValidation.updateById), customerController.updateById);

// http://localhost:8686/api/v1/customers/:id
router.delete("/:id", validateSchema(customerValidation.deleteById), customerController.deleteById);

module.exports = router;
