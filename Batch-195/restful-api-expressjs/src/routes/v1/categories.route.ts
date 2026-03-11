import express from 'express';
import type { Router } from 'express';
import categoriesController from '../../controllers/categories.controller';
import validateSchemaYup from '../../middlewares/validation.middleware';
import { createCategorySchema } from '../../validations/categorySchema';
import { authenticateToken } from '../../middlewares/auth.middleware';
const router: Router = express.Router();

/* Public routes */
// GET /api/v1/categories/web/categories-tree
router.get('/web/categories-tree', categoriesController.getCategoriesTree);

/** PRIVATE ROUTES */
// GET /api/v1/categories
router.get('/', authenticateToken, categoriesController.getAllCategories);
// GET /api/v1/categories/:id
router.get('/:id', authenticateToken,  categoriesController.getCategoryById);
// POST /api/v1/categories
router.post('/', authenticateToken, validateSchemaYup(createCategorySchema), categoriesController.createCategory);
// PUT /api/v1/categories/:id
router.put('/:id', authenticateToken, categoriesController.updateCategoryById);
// DELETE /api/v1/categories/:id
router.delete('/:id', authenticateToken, categoriesController.deleteCategoryById);

export default router;
