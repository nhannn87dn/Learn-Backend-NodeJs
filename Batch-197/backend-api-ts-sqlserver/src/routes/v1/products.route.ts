import express from 'express';
import productsController from '../../controllers/products.controller';
import validateSchema from '../../middleware/validateSchema.middleware';
import productSchemaValidation from '../../validations/product.validation';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = express.Router();

// GET /api/v1/products
router.get('/', authenticateToken, validateSchema(productSchemaValidation.getAllProducts), productsController.getAllProducts);
// GET /api/v1/products/:id
router.get('/:id', authenticateToken, validateSchema(productSchemaValidation.getProductById), productsController.findProductById);

router.post('/', authenticateToken, productsController.createProduct);

router.put('/:id', authenticateToken, productsController.updateProductById);

router.delete('/:id',  authenticateToken, productsController.deleteProductById);

export default router;