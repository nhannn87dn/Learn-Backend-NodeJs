import {Request,Response, NextFunction} from 'express'
import categoriesService from '../services/categories.service';


const getAllProduct = (req: Request, res: Response)=>{
    const result = categoriesService.getAllProduct();
    console.log('result',result);
    res.status(200).json(result)
}

const getCategoryById = (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params; //return id = string

        const category = categoriesService.getCategoryById(parseInt(id))

        res.status(200).json(category)
    }
    catch(err){
        next(err)
    }
}

const createCategory = (req: Request, res: Response) => {
    const data = req.body;

    const category= categoriesService.createCategory(data)

    res.status(201).json({
        message: `Create Category`,
        category: category
    })
}

const updateCategory = (req: Request, res: Response)=>{
    const {id} = req.params;
    const data = req.body;

    
    const category = categoriesService.updateCategory(parseInt(id),data)

    res.status(200).json({
        message: `Update Category by ID ${id}`,
        category: category
    })
}

const deleteCategory = (req: Request, res: Response,next: NextFunction)=>{
    try {
        const {id} = req.params;
        const category = categoriesService.deleteCategory(parseInt(id))
        res.status(200).json({
            message: `Delete Category by ID ${id}`,
            category: category
        })
    }
    catch(err){
        next(err)
    }
}

export default {
    getAllProduct,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}