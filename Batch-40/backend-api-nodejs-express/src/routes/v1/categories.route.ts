import express from "express";
import categoriesController from "../../controllers/categories.controller";
import validateSchemaYup from "../../middlewares/validate.middleware";
import categoryValidation from "../../validations/categories.validation";
import { authenticateToken } from "../../middlewares/auth.middleware";
const router = express.Router();

/* 
PUBLIC ROUTES --> cho EndUser
*/
router.get("/categories/public/getCategories", categoriesController.getCategoriesTree);
router.get("/categories/public/getCategoryBySlug/:slug", categoriesController.getCategoryBySlug);

/* === PRIVATE ROUTES --> UI Dashboard ===*/

// Get All Categories
// GET /api/v1/categories
router.get("/categories", authenticateToken, validateSchemaYup(categoryValidation.getAllSchema), categoriesController.getAll);

// Get Category by Id
router.get("/categories/:id", authenticateToken, validateSchemaYup(categoryValidation.getByIdSchema),   categoriesController.getById);
// Create Category
// POST /api/v1/categories
router.post("/categories",authenticateToken,  validateSchemaYup(categoryValidation.createSchema), categoriesController.create);
// Update Category
// PUT /api/v1/categories/:id
router.put("/categories/:id", authenticateToken, categoriesController.updateById);
// DELETE /api/v1/categories/:id
router.delete("/categories/:id", authenticateToken, categoriesController.deleteById);

/// + Resource API = bao gồm nhiều phương thức
export default router;
