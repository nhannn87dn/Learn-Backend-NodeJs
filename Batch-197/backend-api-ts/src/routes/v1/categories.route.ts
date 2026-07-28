import express from 'express';
import categoriesController from '../../controllers/categories.controller';

const router = express.Router();
// GET /api/v1/categories
router.get('/', categoriesController.getAllCategories);
// GET /api/v1/categories/:id
router.get('/:id', categoriesController.getCategoryById);
// POST /api/v1/categories - create a new category
router.post('/', categoriesController.createCategory);
// PUT /api/v1/categories/:id - update a category by id
router.put('/:id', categoriesController.updateCategoryById);
// DELETE /api/v1/categories/:id - delete a category by id
router.delete('/:id', categoriesController.deleteCategoryById);

export default router;