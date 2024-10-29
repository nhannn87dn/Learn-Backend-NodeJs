import express from "express"
import brandController from '../../controllers/brand.controller'
const router  = express.Router();

/*
GET - Get all brands
localhost:8080/api/v1/brands
*/
router.get('', brandController.findAll);
/*
GET get one brand by ID
localhost:8080/api/v1/brands/:id
*/
router.get('/:id', brandController.findOne);
/**
 * POST - Create a new brand
 * localhost:8080/api/v1/brands
 */
router.post('', brandController.create);
/*
PUT get one brand by ID
localhost:8080/api/v1/brands/:id
*/
router.put('/:id', brandController.updateById);
/*
DELETE get one brand by ID
localhost:8080/api/v1/brands/:id
*/
router.delete('/:id', brandController.deleteById);

export default router