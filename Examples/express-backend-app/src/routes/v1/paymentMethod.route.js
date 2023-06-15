const express = require("express");
const router = express.Router();
const paymentMethodController = require("../../controllers/paymentMethod.controller");

const validateSchema = require("../../middleware/validateSchema.middleware");
const paymentMethodValidation = require("../../validations/paymentMethod.validation");

// http://localhost:8686/api/v1/payment-methods
router.get("/", paymentMethodController.getAll);

// http://localhost:8686/api/v1/payment-methods/:id
router.get("/:id", validateSchema(paymentMethodValidation.getById), paymentMethodController.getById);

// http://localhost:8686/api/v1/payment-methods
router.post("/", validateSchema(paymentMethodValidation.create), paymentMethodController.create);

// http://localhost:8686/api/v1/payment-methods/:id
router.put("/:id", validateSchema(paymentMethodValidation.updateById), paymentMethodController.updateById);

// http://localhost:8686/api/v1/payment-methods/:id
router.delete("/:id", validateSchema(paymentMethodValidation.deleteById), paymentMethodController.deleteById);

module.exports = router;
