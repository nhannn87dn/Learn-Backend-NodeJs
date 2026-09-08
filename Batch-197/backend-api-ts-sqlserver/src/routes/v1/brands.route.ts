import express from 'express';
import brandsController from '../../controllers/brands.controller';
import { routeMiddleware } from '../../middleware/routeMiddleware.middleware';
import { authenticateToken } from '../../middleware/auth.middleware';
const router = express.Router();

//Cách dùng 1: gắp trước all các route của resource brands
//router.use(routeMiddleware);

//Cách dùng 2: gắn vào một endpoint cụ thể

//GET /api/v1/brands/select-options
router.get('/select-options',  authenticateToken, brandsController.getAllBrandsSelect);

// GET /api/v1/brands
router.get('/', authenticateToken, brandsController.getAllBrands);
// GET /api/v1/brands/:id
router.get('/:id', authenticateToken, brandsController.getBrandById);
// POST /api/v1/brands - create a new brand
router.post('/', authenticateToken, brandsController.createBrand);
// PUT /api/v1/brands/:id - update a brand by id
router.put('/:id', authenticateToken, brandsController.updateBrandById);
// DELETE /api/v1/brands/:id - delete a brand by id
router.delete('/:id', authenticateToken, brandsController.deleteBrandById);

export default router;