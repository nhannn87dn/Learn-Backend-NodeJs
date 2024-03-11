import {Request,Response, NextFunction} from 'express'
import brandsService from '../services/brands.service';


const getAll = (req: Request, res: Response)=>{
    const result = brandsService.getAll();
    console.log('result',result);
    res.status(200).json(result)
}

const getBrandById = (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params; //return id = string

        const brand = brandsService.getBrandById(parseInt(id))

        res.status(200).json(brand)
    }
    catch(err){
        next(err)
    }
}

const createBrand = (req: Request, res: Response) => {
    const data = req.body;

    const brand= brandsService.createBrand(data)

    res.status(201).json({
        message: `Create Brand`,
        brand: brand
    })
}

const updateBrand = (req: Request, res: Response)=>{
    const {id} = req.params;
    const data = req.body;

    
    const brand = brandsService.updateBrand(parseInt(id),data)

    res.status(200).json({
        message: `Update Brand by ID ${id}`,
        brand: brand
    })
}

const deleteBrand = (req: Request, res: Response,next: NextFunction)=>{
    try {
        const {id} = req.params;
        const brand = brandsService.deleteBrand(parseInt(id))
        res.status(200).json({
            message: `Delete Brand by ID ${id}`,
            brand: brand
        })
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