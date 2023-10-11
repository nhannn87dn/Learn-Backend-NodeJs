import express, { Router } from 'express';
import customersController from '../controllers/customers.controller';

const router: Router = express.Router();

/**
 * Lấy tất cả khách hàng
 * [GET] /api/v1/customers
 */
router.get('/', customersController.getAll);

/**
 * Lấy thông tin khách hàng bằng ID
 * [GET] /api/v1/customers/:id
 */
router.get('/:id', customersController.getById);

/**
 * Tạo khách hàng mới
 * [POST] /api/v1/customers
 */
router.post('/', customersController.create);

/**
 * Cập nhật thông tin khách hàng bằng ID
 * [PATCH] /api/v1/customers/:id
 */
router.patch('/:id', customersController.updateById);

/**
 * Xóa khách hàng bằng ID
 * [DELETE] /api/v1/customers/:id
 */
router.delete('/:id', customersController.deleteById);

export default router;