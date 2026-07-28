import express from 'express';
import brandsController from '../../controllers/brands.controller';

const router = express.Router();

// GET /api/v1/brands
router.get('/', brandsController.getAllBrands);
// GET /api/v1/brands/:id
router.get('/:id', brandsController.getBrandById);
// POST /api/v1/brands - create a new brand
router.post('/', brandsController.createBrand);
// PUT /api/v1/brands/:id - update a brand by id
router.put('/:id', brandsController.updateBrandById);
// DELETE /api/v1/brands/:id - delete a brand by id
router.delete('/:id', brandsController.deleteBrandById);

export default router;