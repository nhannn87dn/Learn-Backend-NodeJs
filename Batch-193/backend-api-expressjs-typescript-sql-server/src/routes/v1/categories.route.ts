import express from "express";
import categoriesController from "../../controllers/categories.controller";
const router = express.Router();

router.get("/categories", categoriesController.findAll);
router.get("/categories/:id", categoriesController.findById);
router.post("/categories", categoriesController.create);
router.put("/categories/:id", categoriesController.updateById);
router.delete("/categories/:id", categoriesController.deleteById);

export default router;
