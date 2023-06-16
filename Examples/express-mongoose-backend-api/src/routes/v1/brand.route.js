const express = require("express");
const router = express.Router();
const brandController = require("../../controllers/brand.controller");

const validateSchema = require("../../middleware/validateSchema.middleware");
const brandValidation = require("../../validations/brand.validation");

// http://localhost:8686/api/v1/brands
router.get("/", brandController.getAll);

// http://localhost:8686/api/v1/brands/:id
router.get("/:id", validateSchema(brandValidation.getById), brandController.getById);

// http://localhost:8686/api/v1/brands
router.post("/", validateSchema(brandValidation.create), brandController.create);

// http://localhost:8686/api/v1/brands/:id
router.put("/:id", validateSchema(brandValidation.updateById), brandController.updateById);

// http://localhost:8686/api/v1/brands/:id
router.delete("/:id", validateSchema(brandValidation.deleteById), brandController.deleteById);

module.exports = router;
