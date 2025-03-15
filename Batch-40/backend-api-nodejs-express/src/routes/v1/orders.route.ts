import express from "express";
import ordersController from "../../controllers/orders.controller";
const router = express.Router();

/**
 * route để định tuyến
 *  path <==> controller 
 */

// Get All Orders
// GET /api/v1/orders
router.get("/orders",  ordersController.getAll);

// Get Order by Id
router.get("/orders/:id",   ordersController.getById);
// Create Order
// POST /api/v1/orders
router.post("/orders", ordersController.create);
// Update Order
// PUT /api/v1/orders/:id
router.put("/orders/:id", ordersController.updateById);
// DELETE /api/v1/orders/:id
router.delete("/orders/:id", ordersController.deleteById);

/// + Resource API = bao gồm nhiều phương thức
export default router;
