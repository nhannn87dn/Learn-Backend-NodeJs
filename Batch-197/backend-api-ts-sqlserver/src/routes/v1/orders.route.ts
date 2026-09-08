import express from 'express';
import ordersController from '../../controllers/orders.controller';
import validateSchema from '../../middleware/validateSchema.middleware';
import orderSchemaValidation from '../../validations/order.validation';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/', authenticateToken, validateSchema(orderSchemaValidation.getAllOrders), ordersController.getAllOrders);
router.get('/:id', authenticateToken, validateSchema(orderSchemaValidation.getOrderById), ordersController.getOrderById);
router.post('/', validateSchema(orderSchemaValidation.createOrder), ordersController.createOrder);
router.put('/:id', authenticateToken, validateSchema(orderSchemaValidation.updateOrder), ordersController.updateOrderById);
router.delete('/:id', authenticateToken, validateSchema(orderSchemaValidation.deleteOrderById), ordersController.deleteOrderById);

export default router;