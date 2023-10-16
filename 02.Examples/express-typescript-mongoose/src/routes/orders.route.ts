import express, { Router } from 'express';
import ordersController from '../controllers/orders.controller';

const router: Router = express.Router();

/**
 * Lấy tất cả các đơn hàng
 * [GET] /api/v1/orders
 */
router.get('/', ordersController.getAll);

/**
 * Lấy một đơn hàng bằng ID
 * [GET] /api/v1/orders/:id
 */
router.get('/:id', ordersController.getById);

/**
 * Tạo một đơn hàng mới
 * [POST] /api/v1/orders
 */
router.post('/', ordersController.create);

/**
 * Cập nhật một đơn hàng bằng ID
 * [PATCH] /api/v1/orders/:id
 */
router.patch('/:id', ordersController.updateById);

/**
 * Xóa một đơn hàng bằng ID
 * [DELETE] /api/v1/orders/:id
 */
router.delete('/:id', ordersController.deleteById);

export default router;