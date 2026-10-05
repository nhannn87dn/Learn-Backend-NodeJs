import express, { Router } from "express";
import brandsController from "../../controllers/brands.controller";
const router: Router = express.Router();
// GET /api/v1/brands - get all brands
router.get("/", brandsController.findAll);
// GET /api/v1/brands/:id - get brand by ID
router.get("/:id", brandsController.findById);
// POST /api/v1/brands - create a new brand
router.post("/", brandsController.create);
// PUT /api/v1/brands/:id - update a brand by ID
router.put("/:id", brandsController.updateById);
// DELETE /api/v1/brands/:id - delete a brand by ID
router.delete("/:id", brandsController.deleteById);

export default router;
