import {Request,Response, NextFunction} from 'express'
import brandsService from '../services/brands.service';
import { sendJsonSuccess } from '../helpers/responseHandler';


const getAll = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await brandsService.getAll(req.query);
        //console.log('result',result);
        //res.status(200).json(result)
        sendJsonSuccess(res)(result)
    }
    catch(err){
        next(err)
    }
}

const getBrandById = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params; //return id = string

        const brand = await brandsService.getBrandById(id)

       // res.status(200).json(brand)
        sendJsonSuccess(res)(brand)
    }
    catch(err){
        next(err)
    }
}

const createBrand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        const brand=  await brandsService.createBrand(data)

        // res.status(201).json({
        //     message: `Create Brand`,
        //     brand: brand
        // })
        sendJsonSuccess(res, 'Create Staff successfully', 201)(brand)
    }
    catch(err){
        next(err)
    }
}

const updateBrand = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params;
        const data = req.body;

        
        const brand = await brandsService.updateBrand(id,data)

        // res.status(200).json({
        //     message: `Update Brand by ID ${id}`,
        //     brand: brand
        // })
        sendJsonSuccess(res)(brand)
    }
    catch(err){
        next(err)
    }
}

const deleteBrand = async (req: Request, res: Response,next: NextFunction)=>{
    try {
        const {id} = req.params;
        const brand = await brandsService.deleteBrand(id)
        // res.status(200).json({
        //     message: `Delete Brand by ID ${id}`,
        //     brand: brand
        // })
        sendJsonSuccess(res)(brand)
    }
    catch(err){
        next(err)
    }
}

export default {
    getAll,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
}