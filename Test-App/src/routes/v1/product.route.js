const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');

const validateSchema = require('../../middleware/validateSchema.middleware');
// const productValidation = require('../../validations/product.validation');

//http://localhost:8686/api/v1/products
router.get('/', productController.getAllProducts);

//localhost:8686/api/v1/products/:id
router.get(
  '/:id',
  // validateSchema(productsValidation.getProductById),
  productController.getProductById
);

//http://localhost:8686/api/v1/products
router.post('/', productController.createProduct);

//localhost:8686/api/v1/products/:id
router.put('/:id', productController.updateProductById);

//localhost:8686/api/v1/products/:id
router.delete('/:id', productController.deleteProductById);

module.exports = router;
