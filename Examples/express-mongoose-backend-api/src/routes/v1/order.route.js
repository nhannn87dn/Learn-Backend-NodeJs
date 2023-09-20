const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/order.controller");

const validateSchema = require("../../middleware/validateSchema.middleware");
const orderValidation = require("../../validations/order.validation");

// http://localhost:8686/api/v1/orders
router.get("/", orderController.getAll);

// http://localhost:8686/api/v1/orders/:id
router.get("/:id", validateSchema(orderValidation.getById), orderController.getById);

// http://localhost:8686/api/v1/orders
router.post("/", validateSchema(orderValidation.create), orderController.create);

// http://localhost:8686/api/v1/orders/:id
router.put("/:id", validateSchema(orderValidation.updateById), orderController.updateById);

// http://localhost:8686/api/v1/orders/:id
router.delete("/:id", validateSchema(orderValidation.deleteById), orderController.deleteById);

module.exports = router;
