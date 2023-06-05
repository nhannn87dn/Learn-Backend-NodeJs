const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/category.controller');

const validateSchema = require('../../middleware/validateSchema.middleware');
const categoryValidation = require('../../validations/category.validation');

//http://localhost:8686/api/v1/categories
router.get('/', categoryController.getAllCategories);

//localhost:8686/api/v1/categories/:id
router.get(
  '/:id',
  validateSchema(categoryValidation.getCategoryById),
  categoryController.getCategoryById
);

//http://localhost:8686/api/v1/categories
router.post('/', categoryController.createCategory);

//localhost:8686/api/v1/categories/:id
router.put('/:id', categoryController.updateCategoryById);

//localhost:8686/api/v1/categories/:id
router.delete('/:id', categoryController.deleteCategoryById);

module.exports = router;
