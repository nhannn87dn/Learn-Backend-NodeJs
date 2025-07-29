import { Router } from 'express';
import productController from '../../controllers/product.controller';

const router = Router();

// GET /api/v1/products
router.get('/', productController.findAll);

// GET /api/v1/products/:id
router.get('/:id', productController.findById);

// POST /api/v1/products
router.post('/', productController.create);

// PUT /api/v1/products/:id
router.put('/:id', productController.updateById);

// DELETE /api/v1/products/:id
router.delete('/:id', productController.deleteById);

export default router;
