import { NextFunction, Request, Response } from "express";
import productsService from "../services/products.service";
import { sendJsonSuccess } from "../helpers/response.helper";

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
        const product = await productsService.create(req.body);
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
    deleteById
};
