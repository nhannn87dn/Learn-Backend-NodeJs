const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/category.controller");

const validateSchema = require("../../middleware/validateSchema.middleware");
const categoryValidation = require("../../validations/category.validation");

//http://localhost:8686/api/v1/categories
router.get("/", categoryController.getAll);

//localhost:8686/api/v1/categories/dien-thoai
router.get(
  "/:slug",
  validateSchema(categoryValidation.getBySlug),
  categoryController.getBySlug
);

//http://localhost:8686/api/v1/categories
router.post(
  "/",
  validateSchema(categoryValidation.create),
  categoryController.create
);

//localhost:8686/api/v1/categories/:id
router.put(
  "/:id",
  validateSchema(categoryValidation.updateById),
  categoryController.updateById
  );

//localhost:8686/api/v1/categories
router.delete(
  "/", 
  validateSchema(categoryValidation.deleteById),
  categoryController.deleteById
  );

module.exports = router;
