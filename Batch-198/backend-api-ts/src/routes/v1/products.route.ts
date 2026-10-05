import express, { Router } from "express";
import productsController from "../../controllers/products.controller";
const router: Router = express.Router();
// GET /api/v1/products - get all products
router.get("/", productsController.findAll);
// GET /api/v1/products/:id - get product by ID
router.get("/:id", productsController.findById);
// POST /api/v1/products - create a new product
router.post("/", productsController.create);
// PUT /api/v1/products/:id - update a product by ID
router.put("/:id", productsController.updateById);
// DELETE /api/v1/products/:id - delete a product by ID
router.delete("/:id", productsController.deleteById);

export default router;
