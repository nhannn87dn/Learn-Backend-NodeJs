import express from "express";
import categoriesController from "../../controllers/categories.controller";
import validateSchemaYup from "../../middlewares/validate.middleware";
import categoryValidation from "../../validations/categories.validation";
const router = express.Router();

/**
 * route để định tuyến
 *  path <==> controller 
 */

// middleware routes
const routerMiddleware = (req, res, next) => {
    console.log("Tác động đến toàn bộ route bên dưới", "Router Middleware");
    next();
};
router.use(routerMiddleware);

// Get All Categories
// GET /api/v1/categories
router.get("/categories", validateSchemaYup(categoryValidation.getAllSchema), categoriesController.getAll);

const privateMiddleware = (req, res, next) => {
    console.log("Route của categories/:id", "Private Middleware");
    next();
}
// Get Category by Id
router.get("/categories/:id", validateSchemaYup(categoryValidation.getByIdSchema),  privateMiddleware,  categoriesController.getById);
// Create Category
// POST /api/v1/categories
router.post("/categories", validateSchemaYup(categoryValidation.createSchema), categoriesController.create);
// Update Category
// PUT /api/v1/categories/:id
router.put("/categories/:id", categoriesController.updateById);
// DELETE /api/v1/categories/:id
router.delete("/categories/:id", categoriesController.deleteById);

/// + Resource API = bao gồm nhiều phương thức
export default router;
