import { Request, Response } from "express"
import createError from 'http-errors';
import brandsService from "../services/brands.service";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";

/** Get All Brands */
const findAll = async (req: Request, res:Response)=>{
    const brands = await brandsService.findAll();
    //res.json(brands)
    sendJsonSuccess({
        res,
        data: brands
    })
}

/* Find a brand by id */
const findById = async (req: Request, res:Response) => {
    const {id} = req.params; //id nhận được luôn là string
    //Đảm bảo có id 
    if(!id){
        throw createError(400, "ID not found")
    }

    const brand = await brandsService.findById({id})
    
    // res.status(200).json({
    //     data: brand
    // })
    sendJsonSuccess({
        res,
        data: brand
    })
}

//create a new brand
const create = async (req: Request, res:Response)=>{
    console.log('<===== req.body =====>', req.body);
    const newBrand = await brandsService.create({
        brand_name: req.body.brand_name,
        description: req.body.description,
        slug: req.body.slug
    });
   

    sendJsonSuccess({
        res,
        status: SUCCESS.CREATED,
        data: newBrand
    })
}

/* Update a brand by Id */
const updateById = async(req: Request, res:Response)=>{
    console.log(req.params, req.body);
    const {id} = req.params;
    //Đảm bảo có id 
    if(!id){
        throw createError(400, "ID not found")
    }

    const brand = await brandsService.updateById({
        id,
        payload: {
            brand_name: req.body.brand_name,
            description: req.body.description,
            slug: req.body.slug
        }
    })

    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: brand
    })
}

/* Delete a brand by Id */
const deleteById = async(req: Request, res:Response)=>{
    //step1: check xem id co ton tai khong
    const {id} = req.params;
    //Đảm bảo có id 
    if(!id){
        throw createError(400, "ID not found")
    }
    //step1: Check xem trong db co ton tai record co id khong
    const brand = await brandsService.deleteById(id)
    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: brand
    })
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}