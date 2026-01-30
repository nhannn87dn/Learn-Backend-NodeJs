import express from 'express';
import type { Router } from 'express';
import categoriesController from '../../controllers/categories.controller';
const router: Router = express.Router();

// GET /api/v1/categories
router.get('/', categoriesController.getAllCategories);
// GET /api/v1/categories/:id
router.get('/:id', categoriesController.getCategoryById);
// POST /api/v1/categories
router.post('/', categoriesController.createCategory);
// PUT /api/v1/categories/:id
router.put('/:id', categoriesController.updateCategoryById);
// DELETE /api/v1/categories/:id
router.delete('/:id', categoriesController.deleteCategoryById);

export default router;
