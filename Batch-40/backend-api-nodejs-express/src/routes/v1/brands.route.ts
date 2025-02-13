import express from "express";
import brandsController from "../../controllers/brands.controller";
const router = express.Router();

/**
 * route để định tuyến
 *  path <==> controller 
 */

// Get All Brands
// GET /api/v1/brands
router.get("/brands", brandsController.getAll);
// Get Brand by Id
router.get("/brands/:id", brandsController.getById);
// Create Brand
// POST /api/v1/brands
router.post("/brands", brandsController.create);
// Update Brand
// PUT /api/v1/brands/:id
router.put("/brands/:id", brandsController.updateByID);
// DELETE /api/v1/brands/:id
router.delete("/brands/:id", brandsController.deleteById);

/// + Resource API = bao gồm nhiều phương thức
export default router;
