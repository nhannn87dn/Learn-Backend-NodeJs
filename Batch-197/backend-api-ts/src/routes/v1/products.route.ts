import express from 'express';
import productsController from '../../controllers/products.controller';
const router = express.Router();

/*
Nhiệm vụ của routes
là :
- Định nghĩa các endpoint (URL) cho resource products
- Gắn controller tương ứng với từng endpoint
*/

// GET /api/v1/products
router.get('/', productsController.findAll);
// GET /api/v1/products/:id
router.get('/:id', productsController.findById)
// POST /api/v1/products
router.post('/', productsController.create);
// PUT /api/v1/products/:id
router.put('/:id', productsController.update);
// DELETE /api/v1/products/:id
router.delete('/:id', productsController.remove);

export default router;
