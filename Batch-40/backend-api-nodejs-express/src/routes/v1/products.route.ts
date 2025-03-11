import express from "express";
const router = express.Router();
import productsController from "../../controllers/products.controller";
import { authenticateToken } from "../../middlewares/auth.middleware";

/**
 * route để định tuyến
 *  path <==> controller 
 */

// Get All Products
// GET /api/v1/products
router.get("/products", authenticateToken, productsController.getAll);
// Get Product by Id
router.get("/products/:id",  authenticateToken, productsController.getById);
// Create Product
// POST /api/v1/products
router.post("/products",  authenticateToken, productsController.create);
// Update Product
// PUT /api/v1/products/:id
router.put("/products/:id",  authenticateToken, productsController.updateById);
// DELETE /api/v1/products/:id
router.delete("/products/:id",  authenticateToken, productsController.deleteById);

/// + Resource API = bao gồm nhiều phương thức
export default router;
