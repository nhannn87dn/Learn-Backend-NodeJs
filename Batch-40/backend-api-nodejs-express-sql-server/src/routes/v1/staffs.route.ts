import express from "express";
import staffsController from "../../controllers/staffs.controller";
import validateSchemaYup from "../../middlewares/validate.middleware";
import staffValidation from "../../validations/staffs.validation";
const router = express.Router();

/**
 * route để định tuyến
 *  path <==> controller 
 */

// Get All Staffs
// GET /api/v1/staffs
router.get("/staffs", validateSchemaYup(staffValidation.getAllSchema), staffsController.getAll);

// Get Staff by Id
router.get("/staffs/:id", validateSchemaYup(staffValidation.getByIdSchema),  staffsController.getById);
// Create Staff
// POST /api/v1/staffs
router.post("/staffs", staffsController.create);
// Update Staff
// PUT /api/v1/staffs/:id
router.put("/staffs/:id", staffsController.updateById);
// DELETE /api/v1/staffs/:id
router.delete("/staffs/:id", staffsController.deleteById);

/// + Resource API = bao gồm nhiều phương thức
export default router;
