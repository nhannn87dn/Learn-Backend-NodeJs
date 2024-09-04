import express from 'express'
import customersController from '../../controllers/customers.controller';
import { checkCustomerToken } from '../../middlewares/customer.middleware';
const router = express.Router();



//POST v1/auth/login
router.post('/login',  customersController.login)

router.get('/profile', checkCustomerToken,  customersController.profile )

router.post('/refresh-token',  customersController.refreshToken)


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