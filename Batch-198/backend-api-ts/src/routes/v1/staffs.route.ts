import express, { Router } from "express";
import staffsController from "../../controllers/staffs.controller";
import { authenticateToken } from "../../middlewares/auth.middleware";

const router: Router = express.Router();

// GET /api/v1/staffs - get all staffs
router.get("/", authenticateToken, staffsController.findAll);
// GET /api/v1/staffs/:id - get staff by ID
router.get("/:id", authenticateToken, staffsController.findById);
// POST /api/v1/staffs - create a new staff
router.post("/", authenticateToken, staffsController.create);
// PUT /api/v1/staffs/:id - update a staff by ID
router.put("/:id", authenticateToken, staffsController.updateById);
// DELETE /api/v1/staffs/:id - delete a staff by ID
router.delete("/:id", authenticateToken, staffsController.deleteById);

export default router;
