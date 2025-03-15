import express from "express";
import customersController from "../../controllers/customers.controller";
const router = express.Router();

/**
 * route để định tuyến
 *  path <==> controller 
 */

// Get All Customers
// GET /api/v1/customers
router.get("/customers",  customersController.getAll);

// Get Customer by Id
router.get("/customers/:id",   customersController.getById);
// Create Customer
// POST /api/v1/customers
router.post("/customers", customersController.create);
// Update Customer
// PUT /api/v1/customers/:id
router.put("/customers/:id", customersController.updateById);
// DELETE /api/v1/customers/:id
router.delete("/customers/:id", customersController.deleteById);

/// + Resource API = bao gồm nhiều phương thức
export default router;
