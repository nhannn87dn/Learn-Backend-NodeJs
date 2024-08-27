import express from 'express'
import productsController from '../../controllers/products.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';


const router = express.Router();


//========= CHECK TOKEN BEGIN HERE =================================
router.use(authenticateToken)
// ==> Tất cả những routes sau câu lệnh này sẽ bị check token

/**
 * Get ALl Products
 * GET /api/v1/products
 */

router.get('', productsController.findAll)

/**
 * Get Single Product
 * GET /api/v1/products/:id
 */

router.get('/:id',productsController.findOne)


/**
 * create new Product
 * POST /api/v1/products
 */

router.post('',productsController.createDocument)


/**
 * update Product
 * PUT /api/v1/products/:id
 */

router.put('/:id',productsController.updateById)


/**
 * Xóa sản phẩm
 * DELETE /api/v1/products/:id
 */

router.delete('/:id', productsController.deleteById)



export default router