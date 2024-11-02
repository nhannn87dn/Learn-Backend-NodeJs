import express, { NextFunction, Request, Response } from "express"
import categoryController from '../../controllers/category.controller'
import { TCustomRequest } from "../../types/express";
import validateSchemaYup from "../../middlewares/validateSchemaYup.middleware";
import categoryValidation from "../../validations/category.validation";

const router  = express.Router();

const categoryMiddleware = (req: Request, res: Response, next: NextFunction)=>{

    // Add your middleware logic here
    console.log('Middleware for all routes');
    next();//luôn ở dòng code cuối cùng của middleware
}

const categoryPrivateMiddleware = (req: TCustomRequest, res: Response, next: NextFunction)=>{

    // Add your middleware logic here
    console.log('Middleware get All category route');
    console.log('req.user', req.user);
    console.log('<<=== 🚀 res.locals.user ===>>',res.locals.user);
    next();//luôn ở dòng code cuối cùng của middleware
}
// Apply middleware to all routes
//router.use(categoryMiddleware)

/*
GET - Get all categories
localhost:8080/api/v1/categories
*/
//Middleware riêng cho một route cụ thể
router.get('', categoryController.findAll);

/*
GET get one category by ID
localhost:8080/api/v1/categories/:id
*/
router.get('/:id', validateSchemaYup(categoryValidation.findOne), categoryController.findOne);
/**
 * POST - Create a new category
 * localhost:8080/api/v1/categories
 */
router.post('', validateSchemaYup(categoryValidation.create), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await categoryController.create(req, res, next);
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});
/*
PUT get one category by ID
localhost:8080/api/v1/categories/:id
*/
router.put('/:id', categoryController.updateById);
/*
DELETE get one category by ID
localhost:8080/api/v1/categories/:id
*/
router.delete('/:id', categoryController.deleteById);

export default router