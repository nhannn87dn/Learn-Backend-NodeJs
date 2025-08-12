import express from "express";
import categoriesController from "../../controllers/categories.controller";
import { authenticateToken } from "../../midlewares/auth.middleware";
const router = express.Router();

/** PUBLIC ROUTES */
router.get("/categories/tree", categoriesController.getCategoryTree);
/** PRIVATE ROUTES */
router.get("/categories", authenticateToken, categoriesController.findAll);
router.get("/categories/:id", authenticateToken, categoriesController.findById);
router.post("/categories", authenticateToken, categoriesController.create);
router.put("/categories/:id", authenticateToken, categoriesController.updateById);
router.delete("/categories/:id", authenticateToken, categoriesController.deleteById);

export default router;
