import express from "express";
import categoriesController from "../../controllers/categories.controller";
import validateSchemaYup from '../../midlewares/validateSchema.midleware';
import categoryValidation from '../../validations/category.validation';
const router = express.Router();

router.get("/categories", categoriesController.findAll);
router.get("/categories/:id", validateSchemaYup(categoryValidation.findById), categoriesController.findById);
router.post("/categories", validateSchemaYup(categoryValidation.create), categoriesController.create);
router.put("/categories/:id", validateSchemaYup(categoryValidation.updateById), categoriesController.updateById);
router.delete("/categories/:id", validateSchemaYup(categoryValidation.deleteById), categoriesController.deleteById);

export default router;
