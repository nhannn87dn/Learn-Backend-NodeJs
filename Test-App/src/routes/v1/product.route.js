const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');

const validateSchema = require('../../middleware/validateSchema.middleware');
// const productValidation = require('../../validations/product.validation');

//http://localhost:8686/api/v1/products
router.get('/', productController.getAll);

//localhost:8686/api/v1/products/:id
router.get(
  '/:id',
  // validateSchema(productsValidation.getById),
  productController.getById
);

//http://localhost:8686/api/v1/products
router.post('/', productController.create);

//localhost:8686/api/v1/products/:id
router.put('/:id', productController.updateById);

//localhost:8686/api/v1/products
router.delete('/', productController.deleteById);

module.exports = router;
