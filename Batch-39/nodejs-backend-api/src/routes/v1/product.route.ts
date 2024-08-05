import express from 'express'
import productsController from '../../controllers/products.controller';
const router = express.Router();


/**
 * Get ALl Products
 * GET /api/v1/products
 */

router.get('',productsController.findAll)

export default router