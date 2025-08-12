import { Router } from 'express';
import productController from '../../controllers/product.controller';
import { authenticateToken } from '../../midlewares/auth.middleware';

const router = Router();

/** PUBLIC ROUTES */
// GET /api/v1/products/home/:catId?limit=5
router.get('/products/home/:catId', productController.findHomeProducts);
// GET /api/v1/products/category/:slug
router.get('/products/category/:slug', productController.getProductsByCategorySlug);

/** PRIVATE ROUTES */
router.get('/products', authenticateToken, productController.findAll);
router.get('/products/:id', authenticateToken, productController.findById);

// POST /api/v1/products
router.post('/products', authenticateToken, productController.create);

// PUT /api/v1/products/:id
router.put('/products/:id', authenticateToken, productController.updateById);

// DELETE /api/v1/products/:id
router.delete('/products/:id', authenticateToken, productController.deleteById);

export default router;
