import express from 'express'
import staffsController from '../../controllers/staffs.controller';
import validateSchema from '../../middlewares/validateSchema.middleware';
import staffsValidation from '../../validations/staffs.validation';

const router = express.Router();


/**
 * Get ALl Staffs
 * GET /api/v1/staffs
 */

router.get('',staffsController.findAll)

/**
 * Get Single Product
 * GET /api/v1/staffs/:id
 */

router.get('/:id',staffsController.findById)


/**
 * create new Product
 * POST /api/v1/staffs
 */
/**
 * Chăn request tạo mới kiểm tra dữ liệu
 * trước khi chuyển sang controller
 */
router.post('', validateSchema(staffsValidation.createRecord), staffsController.createRecord)


/**
 * update Product
 * PUT /api/v1/staffs/:id
 */

router.put('/:id',staffsController.updateById)


/**
 * Xóa sản phẩm
 * DELETE /api/v1/staffs/:id
 */

router.delete('/:id', staffsController.deleteById)



export default router