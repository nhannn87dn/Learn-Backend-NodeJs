import { Router } from 'express';
import orderController from '../../controllers/order.controller';

const router = Router();

// GET /api/v1/orders
router.get('/', orderController.findAll);

// GET /api/v1/orders/:id
router.get('/:id', orderController.findById);

// POST /api/v1/orders
router.post('/', orderController.create);

// PUT /api/v1/orders/:id
router.put('/:id', orderController.updateById);

// DELETE /api/v1/orders/:id
router.delete('/:id', orderController.deleteById);

export default router;
