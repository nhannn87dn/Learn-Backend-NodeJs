import express from 'express';
import categoriesController from '../../controllers/categories.controller';
//import { authenticateToken } from '../../middleware/auth.middleware';

const router = express.Router();

//====== PUBLIC ROUTES ====== 
//GET /api/v1/categories/public/categories-tree
// router.get('/public/categories-tree', categoriesController.getCategoriesTree);
// //GET /api/v1/categories/public/:categoryId/home-products?limit=5
// router.get('/public/:categoryId/home-products', categoriesController.getCategoryHomeProducts);
// //GET /api/v1/categories/public/:slug/products?limit=20&page=1&sortBy=price&sortType=asc
// router.get('/public/:slug/products', categoriesController.getCategoryProducts);

//====== PRIVATE ROUTES ====== 
//GET /api/v1/categories/select-options
router.get('/select-options', categoriesController.getAllCategoriesSelect);
// GET /api/v1/categories
router.get('/',categoriesController.getAllCategories);
// GET /api/v1/categories/:id
router.get('/:id',categoriesController.getCategoryById);
// POST /api/v1/categories - create a new category
router.post('/',categoriesController.createCategory);
// PUT /api/v1/categories/:id - update a category by id
router.put('/:id',categoriesController.updateCategoryById);
// DELETE /api/v1/categories/:id - delete a category by id
router.delete('/:id',categoriesController.deleteCategoryById);

export default router;