import express, { Router } from 'express';
import productsController from '../controllers/products.controller';

const router: Router = express.Router();

/**
 * Lấy tất cả sản phẩm
 * [GET] /api/v1/products
 */
router.get('/', productsController.getAll);

/**
 * Lấy thông tin sản phẩm bằng ID
 * [GET] /api/v1/products/:id
 */
router.get('/:id', productsController.getById);

/**
 * Tạo sản phẩm mới
 * [POST] /api/v1/products
 */
router.post('/', productsController.create);

/**
 * Cập nhật thông tin sản phẩm bằng ID
 * [PATCH] /api/v1/products/:id
 */
router.patch('/:id', productsController.updateById);

/**
 * Xóa sản phẩm bằng ID
 * [DELETE] /api/v1/products/:id
 */
router.delete('/:id', productsController.deleteById);

export default router;