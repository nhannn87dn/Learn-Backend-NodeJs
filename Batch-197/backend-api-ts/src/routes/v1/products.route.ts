import express from 'express';
import productsController from '../../controllers/products.controller';
import validateSchema from '../../middleware/validateSchema.middleware';
import productSchemaValidation from '../../validations/product.validation';

const router = express.Router();

// GET /api/v1/products
router.get('/', validateSchema(productSchemaValidation.getAllProducts), productsController.getAllProducts);
// GET /api/v1/products/:id
router.get('/:id', validateSchema(productSchemaValidation.getProductById), productsController.findProductById);

router.post('/', productsController.createProduct);

router.put('/:id', productsController.updateProductById);

router.delete('/:id', productsController.deleteProductById);

export default router;