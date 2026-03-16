import express from 'express';
import type { Router } from 'express';
import brandsController from '../../controllers/brands.controller';
const router: Router = express.Router();

// GET /api/v1/brands
router.get('/', brandsController.getAllBrands);
// GET /api/v1/brands/:id
router.get('/:id', brandsController.getBrandById);
// POST /api/v1/brands
router.post('/', brandsController.createBrand);
// PUT /api/v1/brands/:id
router.put('/:id', brandsController.updateBrandById);
// DELETE /api/v1/brands/:id
router.delete('/:id', brandsController.deleteBrandById);

export default router;
