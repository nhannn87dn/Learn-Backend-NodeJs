import express from 'express'
import customersController from '../../controllers/customers.controller';

const router = express.Router();


/**
 * Get ALl Staffs
 * GET /api/v1/customers
 */

router.get('',customersController.findAll)

/**
 * Get Single Product
 * GET /api/v1/customers/:id
 */

router.get('/:id',customersController.findById)


/**
 * create new Product
 * POST /api/v1/customers
 */
/**
 * Chăn request tạo mới kiểm tra dữ liệu
 * trước khi chuyển sang controller
 */
router.post('', customersController.createRecord)


/**
 * update Product
 * PUT /api/v1/customers/:id
 */

router.put('/:id',customersController.updateById)


/**
 * Xóa sản phẩm
 * DELETE /api/v1/customers/:id
 */

router.delete('/:id', customersController.deleteById)



export default router