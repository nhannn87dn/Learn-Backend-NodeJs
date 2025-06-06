import { NextFunction, Request, Response } from 'express';
import { httpStatus, sendJsonSuccess } from '../helpers/response.helper';
import productsService from '../services/products.service';

const getProductsByCategorySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productsService.getProductsByCategorySlug(req.params,req.query);
        sendJsonSuccess(res, products);
    } catch (error) {
        next(error);
    }
}

const getProductBySlug= async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {slug} = req.params;
        const product = await productsService.getProductBySlug(slug)
        sendJsonSuccess(res, product);
    } catch (error) {
        next(error);
    }
}

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productsService.getAll(req.query);
        sendJsonSuccess(res, products);
    } catch (error) {
        next(error);
    }
}

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await productsService.getById(id);
        sendJsonSuccess(res, product);
    } catch (error) {
        next(error);
    }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const product = await productsService.create(payload);
        sendJsonSuccess(res, product,httpStatus.CREATED.statusCode,httpStatus.CREATED.message)
    } catch (error) {
        next(error);
    }
}

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const product = await productsService.updateById(id, payload);
        sendJsonSuccess(res, product);
    } catch (error) {
        next(error);
    }
}

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await productsService.deleteById(id);
        sendJsonSuccess(res, product);
    } catch (error) {
        next(error);
    }
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
    getProductsByCategorySlug,
    getProductBySlug
}