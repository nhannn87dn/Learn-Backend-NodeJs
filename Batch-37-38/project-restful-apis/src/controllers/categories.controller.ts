import {Request,Response, NextFunction} from 'express'
import categoriesService from '../services/categories.service';


const getAllProduct = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await categoriesService.getAll();
        console.log('result',result);
        res.status(200).json(result)
    }
    catch(err){
        next(err)
    }
}

const getCategoryById = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params; //return id = string

        const category = await categoriesService.getCategoryById(id)

        res.status(200).json(category)
    }
    catch(err){
        next(err)
    }
}

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        const category=  await categoriesService.createCategory(data)

        res.status(201).json({
            message: `Create Category`,
            category: category
        })
    }
    catch(err){
        next(err)
    }
}

const updateCategory = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params;
        const data = req.body;

        
        const category = await categoriesService.updateCategory(id,data)

        res.status(200).json({
            message: `Update Category by ID ${id}`,
            category: category
        })
    }
    catch(err){
        next(err)
    }
}

const deleteCategory = async (req: Request, res: Response,next: NextFunction)=>{
    try {
        const {id} = req.params;
        const category = await categoriesService.deleteCategory(id)
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