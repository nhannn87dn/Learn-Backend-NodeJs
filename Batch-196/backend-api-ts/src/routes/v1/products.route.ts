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

const router = express.Router();

/*
Nhiệm vụ của routes
là :
- Định nghĩa các endpoint (URL) cho resource products
- Gắn controller tương ứng với từng endpoint
*/

// GET /api/v1/products
router.get(
  "/",
  validateSchemaYup(getAllProductsSchema),
  productsController.findAll,
);
// GET /api/v1/products/:id
router.get(
  "/:id",
  validateSchemaYup(getProductByIdSchema),
  productsController.findById,
);
// POST /api/v1/products
router.post(
  "/",
  validateSchemaYup(createProductSchema),
  productsController.create,
);
// PUT /api/v1/products/:id
router.put(
  "/:id",
  validateSchemaYup(updateProductSchema),
  productsController.update,
);
// DELETE /api/v1/products/:id
router.delete(
  "/:id",
  validateSchemaYup(deleteProductSchema),
  productsController.remove,
);

export default router;
