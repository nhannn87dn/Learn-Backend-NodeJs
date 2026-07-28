import { type Request, type Response } from 'express';
import brandsService from '../services/brands.service';
import { sendJsonSuccess, SUCCESS } from '../helpers/response.helper';

//Get All Brands
const getAllBrands = (req: Request, res: Response) => {
    const brands = brandsService.findAll();

    sendJsonSuccess(res, brands)
};

//Get Brand by ID
const getBrandById = (req: Request, res: Response) => {
    const { id } = req.params;

    const brand = brandsService.findById(parseInt(id as string));

    sendJsonSuccess(res, brand)
};

//create a new brand
const createBrand = (req: Request, res: Response) => {
    const payload = req.body;

    const brand = brandsService.create(payload);

    sendJsonSuccess(res, brand, SUCCESS.CREATED)
};

//update a brand by id
const updateBrandById = (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const brandUpdated = brandsService.updateById(parseInt(id as string), payload);

    sendJsonSuccess(res, brandUpdated)
};

//delete a brand by id
const deleteBrandById = (req: Request, res: Response) => {
    const { id } = req.params;

    const brand = brandsService.deleteById(parseInt(id as string));

    sendJsonSuccess(res, brand)
};

export default {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrandById,
    deleteBrandById
}