import express, {Request, Response} from 'express'
const router = express();
import categoryController from '../controllers/category.controller';

//GET - http:localhost:8000/categories
router.get('', categoryController.getAll)

//GET - http:localhost:8000/categories/:id
router.get('/:id',categoryController.getById)

//POST - http:localhost:8000/categories
router.post('', categoryController.create)
//PUT - http:localhost:8000/categories/:id
router.put('/:id', categoryController.updateById)
//DELETE - http:localhost:8000/categories/:id
router.delete('/:id', categoryController.deleteById)



export default router