import { Request, Response } from "express"
import createError from 'http-errors';
import categoriesService from "../services/categories.service";
import categoriesStoreService from "../services/webStore/categoriesStore.service";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";

/**Get Category Tree */
const getCategoryTree = async (req: Request, res: Response) => {
    const categoryTree = await categoriesStoreService.getCategoryTree();
    sendJsonSuccess({
        res,
        data: categoryTree
    });
}

/** Get All Categories */
const findAll = async (req: Request, res:Response)=>{
    const categories = await categoriesService.findAll();
    //res.json(categories)
    sendJsonSuccess({
        res,
        data: categories
    })
}

/* Find a category by id */
const findById = async (req: Request, res:Response) => {
    const {id} = req.params; //id nhận được luôn là string
    //Đảm bảo có id 
    if(!id){
        throw createError(400, "ID not found")
    }

    const category = await categoriesService.findById({id})
    
    // res.status(200).json({
    //     data: category
    // })
    sendJsonSuccess({
        res,
        data: category
    })
}

//create a new category
const create = async (req: Request, res:Response)=>{
    console.log('<===== req.body =====>', req.body);
    const newCategory = await categoriesService.create({
        category_name: req.body.category_name,
        description: req.body.description,
        slug: req.body.slug
    });
   

    sendJsonSuccess({
        res,
        status: SUCCESS.CREATED,
        data: newCategory
    })
}

/* Update a category by Id */
const updateById = async(req: Request, res:Response)=>{
    console.log(req.params, req.body);
    const {id} = req.params;
    //Đảm bảo có id 
    if(!id){
        throw createError(400, "ID not found")
    }

    const category = await categoriesService.updateById({
        id,
        payload: {
            category_name: req.body.category_name,
            description: req.body.description,
            slug: req.body.slug
        }
    })

    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: category
    })
}

/* Delete a category by Id */
const deleteById = async(req: Request, res:Response)=>{
    //step1: check xem id co ton tai khong
    const {id} = req.params;
    //Đảm bảo có id 
    if(!id){
        throw createError(400, "ID not found")
    }
    //step1: Check xem trong db co ton tai record co id khong
    const category = await categoriesService.deleteById(id)
    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: category
    })
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    getCategoryTree
}