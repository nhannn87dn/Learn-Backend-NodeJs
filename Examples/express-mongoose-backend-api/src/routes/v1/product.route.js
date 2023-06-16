const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');
const validateSchema = require('../../middleware/validateSchema.middleware');
const productValidation = require('../../validations/product.validator');

// GET /api/v1/products
router.get('/', productController.getAll);

// GET /api/v1/products/:slug
router.get(
    "/:slug",
    validateSchema(productValidation.getBySlug),
    productController.getBySlug
  );
  
// POST /api/v1/products
router.post('/', validateSchema(productValidation.create), productController.create);

// PUT /api/v1/products/:id
router.put('/:id', validateSchema(productValidation.updateById), productController.updateById);

// DELETE /api/v1/products/:id
router.delete('/:id', validateSchema(productValidation.deleteById), productController.deleteById);

module.exports = router;
