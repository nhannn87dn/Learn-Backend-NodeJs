import { type NextFunction, type Request, type Response } from 'express';
import { sendJsonSuccess } from "../helpers/response.helper";
import productsService from '../services/products.service';

const getAllProducts = async(req: Request, res: Response, next: NextFunction) => {

    try {
        const products = await productsService.findAll(req.query);
        sendJsonSuccess(res, products)
    }
    catch (error) {
        next(error)
    }
};

const findProductById = async(req: Request, res: Response, next: NextFunction) => {

    try {
        const id = req.params.id;
        const products = await productsService.findById(String(id));
        sendJsonSuccess(res, products)
    }
    catch (error) {
        next(error)
    }
};

const createProduct = async(req: Request, res: Response, next: NextFunction) => {

    try {
        const createProductDto = req.body;
        const product = await productsService.create({
            product_name: createProductDto.product_name,
            description: createProductDto.description,
            price: createProductDto.price,
            discount: createProductDto.discount,
            category: createProductDto.category,
            brand: createProductDto.brand,
            model_year: createProductDto.model_year,
            slug: createProductDto.slug,
            thumbnail: createProductDto.thumbnail,
            stock: createProductDto.stock
        });
        sendJsonSuccess(res, product)
    }
    catch (error) {
        next(error)
    }
};


const updateProductById = async(req: Request, res: Response, next: NextFunction) => {

    try {
        const id = req.params.id;
        const updateProductDto = req.body;
        const product = await productsService.update(String(id), updateProductDto);
        sendJsonSuccess(res, product)
    }
    catch (error) {
        next(error)
    }
};

const deleteProductById = async(req: Request, res: Response, next: NextFunction) => {

    try {
        const id = req.params.id;
        const product = await productsService.deleteRecord(String(id));
        sendJsonSuccess(res, product)
    }
    catch (error) {
        next(error)
    }
};

export default {
    getAllProducts,
    findProductById,
    createProduct,
    updateProductById,
    deleteProductById
}

