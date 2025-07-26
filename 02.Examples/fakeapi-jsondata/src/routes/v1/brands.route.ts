import express from "express";
import brandsController from "../../controllers/brands.controller";
import validateSchemaYup from '../../midlewares/validateSchema.midleware';
import brandValidation from '../../validations/brand.validation';
const router = express.Router();

router.get("/brands", brandsController.findAll);
router.get("/brands/:id", validateSchemaYup(brandValidation.findById), brandsController.findById);
router.post("/brands", validateSchemaYup(brandValidation.create), brandsController.create);
router.put("/brands/:id", validateSchemaYup(brandValidation.updateById), brandsController.updateById);
router.delete("/brands/:id", validateSchemaYup(brandValidation.deleteById), brandsController.deleteById);

export default router;
