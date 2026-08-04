import { type NextFunction, type Request, type Response } from 'express';
import brandsService from '../services/brands.service';
import { sendJsonSuccess, SUCCESS } from '../helpers/response.helper';

//Get All Brands
const getAllBrands = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const brands = brandsService.findAll();

        sendJsonSuccess(res, brands)
    }
    catch (error) {
        next(error)
    }
};

//Get Brand by ID
const getBrandById = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const brand = brandsService.findById(parseInt(id as string));

        sendJsonSuccess(res, brand)
    }
    catch (error) {
        next(error)
    }
};

//create a new brand
const createBrand = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;

        const brand = brandsService.create(payload);

        sendJsonSuccess(res, brand, SUCCESS.CREATED)
    }
    catch (error) {
        next(error)
    }
};

//update a brand by id
const updateBrandById = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload = req.body;

        const brandUpdated = brandsService.updateById(parseInt(id as string), payload);

        sendJsonSuccess(res, brandUpdated)
    }
    catch (error) {
        next(error)
    }
};

//delete a brand by id
const deleteBrandById = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const brand = brandsService.deleteById(parseInt(id as string));

        sendJsonSuccess(res, brand)
    }
    catch (error) {
        next(error)
    }
};

export default {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrandById,
    deleteBrandById
}