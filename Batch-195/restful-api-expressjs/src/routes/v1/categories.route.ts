import express from 'express';
import type { Router } from 'express';
import categoriesController from '../../controllers/categories.controller';
import { routeMiddleware } from '../../middlewares/route.middleware';
import validateSchemaYup from '../../middlewares/validation.middleware';
import { createCategorySchema } from '../../validations/categorySchema';
const router: Router = express.Router();

// GET /api/v1/categories
router.get('/', routeMiddleware, categoriesController.getAllCategories);
// GET /api/v1/categories/:id
router.get('/:id', categoriesController.getCategoryById);
// POST /api/v1/categories
router.post('/', validateSchemaYup(createCategorySchema), categoriesController.createCategory);
// PUT /api/v1/categories/:id
router.put('/:id', categoriesController.updateCategoryById);
// DELETE /api/v1/categories/:id
router.delete('/:id', categoriesController.deleteCategoryById);

export default router;
