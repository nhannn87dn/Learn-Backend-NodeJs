const express = require("express");
const router = express.Router();
const shippingMethodController = require("../../controllers/shippingMethod.controller");

const validateSchema = require("../../middleware/validateSchema.middleware");
const shippingMethodValidation = require("../../validations/shippingMethod.validation");

// http://localhost:8686/api/v1/shipping-methods
router.get("/", shippingMethodController.getAll);

// http://localhost:8686/api/v1/shipping-methods/:id
router.get("/:id", validateSchema(shippingMethodValidation.getById), shippingMethodController.getById);

// http://localhost:8686/api/v1/shipping-methods
router.post("/", validateSchema(shippingMethodValidation.create), shippingMethodController.create);

// http://localhost:8686/api/v1/shipping-methods/:id
router.put("/:id", validateSchema(shippingMethodValidation.updateById), shippingMethodController.updateById);

// http://localhost:8686/api/v1/shipping-methods/:id
router.delete("/:id", validateSchema(shippingMethodValidation.deleteById), shippingMethodController.deleteById);

module.exports = router;
