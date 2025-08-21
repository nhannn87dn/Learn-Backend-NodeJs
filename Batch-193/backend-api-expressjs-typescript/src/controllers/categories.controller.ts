import { NextFunction, Request, Response } from "express";
import categoriesService from "../services/categories.service";
import { sendJsonSuccess } from "../helpers/response.helper";

const getCategoryTree = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const categoryTree = await categoriesService.getCategoryTree();
        sendJsonSuccess(res, categoryTree);
    } catch (error) {
        next(error);
    }
}

const findAll = async (req:Request, res: Response, next: NextFunction)=>{
    
    try {
         const categories = await categoriesService.findAll()

        // console.log('<<=== 🚀 categories Controller ===>>',categories);
        // res.status(200).json({
        //     statusCode: 200,
        //     message: 'Successfully',
        //     data: categories,
        // });
        sendJsonSuccess(res,categories)
    } catch (error) {
        next(error)
    }
   
}

const findById = async (req:Request, res: Response) => {
    const { id } = req.params;
   
    const category  = await categoriesService.findById(id)

    res.status(200).json({
        statusCode: 200,
        message: 'Successfully',
        data: category,
    });
}

const create = (req:Request, res: Response) => {
    
    const category = categoriesService.create(req.body)
    
    // res.status(201).json({
    //     statusCode: 201,
    //     message: 'Category created successfully',
    //     data: category,
    // });
    sendJsonSuccess(res, category, 'Category created successfully', 201)
}

const updateById = async (req:Request, res: Response) => {
    const { id } = req.params;
    const category = await categoriesService.updateById(id, req.body)
    
    res.status(200).json({
        statusCode: 200,
        message: 'Category updated successfully',
        data: category,
    });
}

const deleteById = async (req:Request, res: Response) => {
    const { id } = req.params;

    const category =  await categoriesService.deleteById(id)
    
    res.status(200).json({
        statusCode: 200,
        message: 'Category deleted successfully',
        data: category
    });
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    getCategoryTree
}