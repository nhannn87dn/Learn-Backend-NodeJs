import express, {NextFunction, Request, Response} from 'express'
import categoriesController from '../../controllers/categories.controller'
const router = express.Router()

// Middleware cấp độ route
function middlewareCategories(req: Request, res: Response, next: NextFunction){
  console.log('Middleware 2');
  next();
}

function privateRoutegetAll(req: Request, res: Response, next: NextFunction){
  console.log('Middleware 3');
  next();
}

//Dùng cho tất cả các routes bên dưới
router.use(middlewareCategories)

//1. Get All Categories
//GET localhost:8080/api/v1/categories
router.get('', privateRoutegetAll, categoriesController.findAll)

//2. Get One Category
//GET localhost:8080/api/v1/categories/:id
router.get('/:id', categoriesController.findById)


//3. Create a new category
//POST localhost:8080/api/v1/categories
router.post('', categoriesController.createRecord)

//4. Update a category
//PUT localhost:8080/api/v1/categories/:id
router.put('/:id', categoriesController.updateById)

//5. Delete a category
//DELETE localhost:8080/api/v1/categories/:id
router.delete('/:id', categoriesController.deleteById)

export default router