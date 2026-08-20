import express from 'express';
import categoriesController from '../../controllers/categories.controller';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = express.Router();
//GET /api/v1/categories/select-options
router.get('/select-options',  authenticateToken, categoriesController.getAllCategoriesSelect);
// GET /api/v1/categories
router.get('/', authenticateToken, categoriesController.getAllCategories);
// GET /api/v1/categories/:id
router.get('/:id', authenticateToken, categoriesController.getCategoryById);
// POST /api/v1/categories - create a new category
router.post('/', authenticateToken, categoriesController.createCategory);
// PUT /api/v1/categories/:id - update a category by id
router.put('/:id', authenticateToken, categoriesController.updateCategoryById);
// DELETE /api/v1/categories/:id - delete a category by id
router.delete('/:id', authenticateToken, categoriesController.deleteCategoryById);

export default router;