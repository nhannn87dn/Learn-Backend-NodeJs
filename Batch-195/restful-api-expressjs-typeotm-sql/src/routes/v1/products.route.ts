import express from 'express';
import type { Router } from 'express';
import productsController from '../../controllers/products.controller';
const router: Router = express.Router();

/* PUBLIC ROUTES */
// GET api/v1/products/web/recommend-home?type=new|hot|sale&limit=5
router.get('/web/recommend-home', productsController.getRecommendProduct);  
// GET api/v1/products/web/sale-category/:catId?limit=5
router.get('/web/sale-category/:catId', productsController.getSaleProductByCategory);                

/* PRIVATE ROUTES */
//todo: implement auth middleware to protect these routes
// GET /api/v1/products
router.get('/', productsController.getAllProducts);
// GET /api/v1/products/:id
router.get('/:id', productsController.getProductById);
// POST /api/v1/products
router.post('/', productsController.createProduct);
// PUT /api/v1/products/:id
router.put('/:id', productsController.updateProductById);
// DELETE /api/v1/products/:id
router.delete('/:id', productsController.deleteProductById);

export default router;
