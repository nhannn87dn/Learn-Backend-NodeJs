import express, { Router } from "express";
import categoriesController from "../../controllers/categories.controller";
const router: Router = express.Router();
// GET /api/v1/categories - get All categories
router.get("/", categoriesController.findAll);
// GET /api/v1/categories/:id - get Student by ID
router.get("/:id", categoriesController.findById);
// POST /api/v1/categories - create a new student
router.post("/", categoriesController.create);
// PUT /api/v1/categories/:id - update a student by ID
router.put("/:id", categoriesController.updateById);
// DELETE /api/v1/categories/:id - delete a student by ID
router.delete("/:id", categoriesController.deleteById);

export default router;