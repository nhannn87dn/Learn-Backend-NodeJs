import express from "express";
import productsController from "../../controllers/products.controller";
import validateSchemaYup from "../../middleware/validateSchemaYup.middleware";
import {
  createProductSchema,
  deleteProductSchema,
  getAllProductsSchema,
  getProductByIdSchema,
  updateProductSchema,
} from "../../validations/product.validation";
import { authenticateToken } from "../../middleware/auth.middleware";

const router = express.Router();

/*
Nhiệm vụ của routes
là :
- Định nghĩa các endpoint (URL) cho resource products
- Gắn controller tương ứng với từng endpoint
*/

//PUBLIC ROUTES


// GET /api/v1/products/home/promotions?limit=5
router.get("/home/promotions", productsController.getPromotionProducts)



// PRIVATE ROUTERs

// GET /api/v1/products
router.get(
  "/",
  authenticateToken,
  validateSchemaYup(getAllProductsSchema),
  productsController.findAll,
);
// GET /api/v1/products/:id
router.get(
  "/:id",
  authenticateToken,
  validateSchemaYup(getProductByIdSchema),
  productsController.findById,
);
// POST /api/v1/products
router.post(
  "/",
  authenticateToken,
  validateSchemaYup(createProductSchema),
  productsController.create,
);
// PUT /api/v1/products/:id
router.put(
  "/:id",
  authenticateToken,
  validateSchemaYup(updateProductSchema),
  productsController.update,
);
// DELETE /api/v1/products/:id
router.delete(
  "/:id",
  authenticateToken,
  validateSchemaYup(deleteProductSchema),
  productsController.remove,
);

export default router;
