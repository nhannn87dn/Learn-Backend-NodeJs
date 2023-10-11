import express, { Router } from 'express';
import suppliersController from '../controllers/suppliers.controller';

const router: Router = express.Router();

/**
 * Lấy tất cả các nhà cung cấp
 * [GET] /api/v1/suppliers
 */
router.get('/', suppliersController.getAll);

/**
 * Lấy một nhà cung cấp bằng ID
 * [GET] /api/v1/suppliers/:id
 */
router.get('/:id', suppliersController.getById);

/**
 * Tạo một nhà cung cấp mới
 * [POST] /api/v1/suppliers
 */
router.post('/', suppliersController.create);

/**
 * Cập nhật một nhà cung cấp bằng ID
 * [PATCH] /api/v1/suppliers/:id
 */
router.patch('/:id', suppliersController.updateById);

/**
 * Xóa một nhà cung cấp bằng ID
 * [DELETE] /api/v1/suppliers/:id
 */
router.delete('/:id', suppliersController.deleteById);

export default router;