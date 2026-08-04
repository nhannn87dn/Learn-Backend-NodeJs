import express from 'express';
import productsController from '../../controllers/products.controller';

const router = express.Router();

// GET /api/v1/products
router.get('/', productsController.getAllProducts);
// GET /api/v1/products/:id
router.get('/:id', productsController.findProductById);

router.post('/', productsController.createProduct);

router.put('/:id', productsController.updateProductById);

router.delete('/:id', productsController.deleteProductById);

export default router;