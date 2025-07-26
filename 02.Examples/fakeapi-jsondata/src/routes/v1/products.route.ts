import { Router } from 'express';
import productController from '../../controllers/product.controller';
import validateSchemaYup from '../../midlewares/validateSchema.midleware';
import productValidation from '../../validations/product.validation';

const router = Router();

// GET /api/v1/products
router.get('/', productController.findAll);

// GET /api/v1/products/:id
router.get('/:id', validateSchemaYup(productValidation.findById), productController.findById);

// POST /api/v1/products
router.post('/', validateSchemaYup(productValidation.create), productController.create);

// PUT /api/v1/products/:id
router.put('/:id', validateSchemaYup(productValidation.updateById), productController.updateById);

// DELETE /api/v1/products/:id
router.delete('/:id', validateSchemaYup(productValidation.deleteById), productController.deleteById);

export default router;
