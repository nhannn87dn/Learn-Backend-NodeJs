import express from "express";
import categoriesController from "../../controllers/categories.controller";
const router = express.Router();

/**
 * route để định tuyến
 *  path <==> controller 
 */

// Get All Categories
// GET /api/v1/categories
router.get("/categories", categoriesController.getAll);
// Get Category by Id
router.get("/categories/:id", categoriesController.getById);
// Create Category
// POST /api/v1/categories
router.post("/categories", categoriesController.create);
// Update Category
// PUT /api/v1/categories/:id
router.put("/categories/:id", categoriesController.updateByID);
// DELETE /api/v1/categories/:id
router.delete("/categories/:id", categoriesController.deleteById);

/// + Resource API = bao gồm nhiều phương thức
export default router;
