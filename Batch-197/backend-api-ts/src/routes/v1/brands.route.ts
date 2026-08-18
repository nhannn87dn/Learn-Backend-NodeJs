import express from 'express';
import brandsController from '../../controllers/brands.controller';
import { routeMiddleware } from '../../middleware/routeMiddleware.middleware';
const router = express.Router();

//Cách dùng 1: gắp trước all các route của resource brands
//router.use(routeMiddleware);

//Cách dùng 2: gắn vào một endpoint cụ thể

//GET /api/v1/brands/select-options
router.get('/select-options', brandsController.getAllBrandsSelect);

// GET /api/v1/brands
router.get('/', routeMiddleware, brandsController.getAllBrands);
// GET /api/v1/brands/:id
router.get('/:id', brandsController.getBrandById);
// POST /api/v1/brands - create a new brand
router.post('/', brandsController.createBrand);
// PUT /api/v1/brands/:id - update a brand by id
router.put('/:id', brandsController.updateBrandById);
// DELETE /api/v1/brands/:id - delete a brand by id
router.delete('/:id', brandsController.deleteBrandById);

export default router;