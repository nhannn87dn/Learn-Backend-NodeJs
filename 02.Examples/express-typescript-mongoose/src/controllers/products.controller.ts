import { NextFunction, Request, Response } from 'express';
import productsService from '../services/products.service';
import { sendJsonSuccess } from '../helpers/responseHandler';
import { IProduct } from '../types/models';

/**
 * Lấy tất cả sản phẩm
 */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = req.query.page ? parseInt(req.query.page as string) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
        
        const products = await productsService.findAll(page, limit);
        sendJsonSuccess(res)(products);
    } catch (error) {
        next(error);
    }
};

/**
 * Lấy thông tin sản phẩm bằng ID
 */
const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await productsService.findById(id);
        sendJsonSuccess(res)(product);
    } catch (error) {
        next(error);
    }
};

/**
 * Tạo sản phẩm mới
 */
const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: IProduct = req.body;
        const product = await productsService.create(payload);
        sendJsonSuccess(res)(product);
    } catch (error) {
        next(error);
    }
};

/**
 * Cập nhật thông tin sản phẩm bằng ID
 */
const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload: IProduct = req.body;
        const product = await productsService.updateById(id, payload);
        sendJsonSuccess(res)(product);
    } catch (error) {
        next(error);
    }
};

/**
 * Xóa sản phẩm bằng ID
 */
const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await productsService.deleteById(id);
        sendJsonSuccess(res)(product);
    } catch (error) {
        next(error);
    }
};

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};