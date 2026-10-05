import {Request, Response, NextFunction} from "express";
import productsService from "../services/products.service";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productsService.findAll(req.query);
        sendJsonSuccess(res, products);
    } catch (error) {
        next(error);
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await productsService.findById(String(id));
        sendJsonSuccess(res, product);
    } catch (error) {
        next(error);
    }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const newProduct = await productsService.create(payload);
        sendJsonSuccess(res, newProduct, SUCCESS.CREATED);
    } catch (error) {
        next(error);
    }
}

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const updatedProduct = await productsService.updateById(String(id), payload);
        sendJsonSuccess(res, updatedProduct);
    } catch (error) {
        next(error);
    }
}

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productsService.deleteById(String(id));
        sendJsonSuccess(res, deletedProduct);
    } catch (error) {
        next(error);
    }
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}
