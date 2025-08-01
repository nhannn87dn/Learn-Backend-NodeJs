import { Router } from 'express';
import customerController from '../../controllers/customer.controller';

const router = Router();

// GET /api/v1/customers
router.get('/', customerController.findAll);

// GET /api/v1/customers/:id
router.get('/:id', customerController.findById);

// POST /api/v1/customers
router.post('/', customerController.create);

// PUT /api/v1/customers/:id
router.put('/:id', customerController.updateById);

// DELETE /api/v1/customers/:id
router.delete('/:id', customerController.deleteById);

export default router;
