import { Request, Response } from "express"
import createError from 'http-errors';
import categoriesService from "../services/categories.service";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";

/** Get All Categories */
const findAll = (req: Request, res:Response)=>{
    const categories = categoriesService.findAll();
    //res.json(categories)
    sendJsonSuccess({
        res,
        data: categories
    })
}

/* Find a category by id */
const findById = (req: Request, res:Response) => {
    const {id} = req.params; //id nhận được luôn là string
    //Đảm bảo có id 
    if(!id){
        throw createError(400, "ID not found")
    }

    const category = categoriesService.findById({id})
    
    // res.status(200).json({
    //     data: category
    // })
    sendJsonSuccess({
        res,
        data: category
    })
}

//create a new category
const create = (req: Request, res:Response)=>{
    console.log('<===== req.body =====>', req.body);
    const newCategory = categoriesService.create({
        name: req.body.name
    });
   //Note: Tạo mới thì status nên là 201
    // res.status(201).json({
    //     data: newCategory,
    // })

    sendJsonSuccess({
        res,
        status: SUCCESS.CREATED,
        data: newCategory
    })
}

/* Update a category by Id */
const updateById = (req: Request, res:Response)=>{
    console.log(req.params, req.body);
    const {id} = req.params;
    //Đảm bảo có id 
    if(!id){
        throw createError(400, "ID not found")
    }
    
    const category = categoriesService.updateById({
        id,
        payload: {
            name: req.body.name
        }
    })

    res.json({
        data: category
    })
}

/* Delete a category by Id */
const deleteById = (req: Request, res:Response)=>{
    //step1: check xem id co ton tai khong
    const {id} = req.params;
    //Đảm bảo có id 
    if(!id){
        throw createError(400, "ID not found")
    }
    //step1: Check xem trong db co ton tai record co id khong
    const category = categoriesService.deleteById(id)
    res.json({
        data: category
    })
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}