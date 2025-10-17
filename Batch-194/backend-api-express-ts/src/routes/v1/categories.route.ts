import express, {Router} from 'express';
import categoriesController from '../../controllers/categories.controller';

const router = express.Router() as Router;

//GET api/v1/categories ==> get all categories
router.get('/', categoriesController.findAll);
//GET api/v1/categories/:id ==> get category by id
router.get('/:id', categoriesController.findById)
//POST api/v1/categories ==> create new category
router.post('/', categoriesController.create)
//PUT api/v1/categories/:id ==> Update a category
router.put('/:id', categoriesController.updateById)
//DELETE api/v1/categories/:id ==> Delete a category by id
router.delete('/:id', categoriesController.deleteById)

export default router;