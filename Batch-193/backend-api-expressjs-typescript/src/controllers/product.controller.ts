import createError from 'http-errors';
import { NextFunction, Request, Response } from "express";
import productsService from "../services/products.service";
import { sendJsonSuccess } from "../helpers/response.helper";



const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
    try {
       
        sendJsonSuccess(res, [], 'Product uploaded successfully');
    } catch (error) {
        next(error);
    }
};

const findHomeProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productsService.findHomeProducts({
            catId: req.params.catId,
            limit: req.query.limit ? parseInt(req.query.limit as string) : 5
        });
        sendJsonSuccess(res, products);
    } catch (error) {
        next(error);
    }
};

const getProductsByCategorySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productsService.getProductsByCategorySlug(req.params.slug, req.query);
        sendJsonSuccess(res, products);
    } catch (error) {
        next(error);
    }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productsService.findAll(req.query);
        sendJsonSuccess(res, products);
    } catch (error) {
        next(error);
    }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await productsService.findById(id);
        sendJsonSuccess(res, product);
    } catch (error) {
        next(error);
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('create req.file',req.file);
        //TODO: handle error when not exist req.file
        if (!req.file) {
            return next(createError(400, "Please upload a file"));
        }
        const product = await productsService.create({
            ...req.body,
            //path: 'public\\uploads\\chanh-1755779841245.png'
            //remove public\\
            thumbnail: req.file ? req.file.destination.replace('public/', '') + '/' + req.file.filename : '', // Lưu đường dẫn file đã upload
        });
        sendJsonSuccess(res, product, 'Product created successfully', 201);
    } catch (error) {
        next(error);
    }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await productsService.updateById(id, req.body);
        sendJsonSuccess(res, product, 'Product updated successfully');
    } catch (error) {
        next(error);
    }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await productsService.deleteById(id);
        sendJsonSuccess(res, product, 'Product deleted successfully');
    } catch (error) {
        next(error);
    }
};

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    findHomeProducts,
    getProductsByCategorySlug,
    uploadSingle
};
