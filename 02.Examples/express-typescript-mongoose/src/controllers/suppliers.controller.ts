import { NextFunction, Request, Response } from 'express';
import suppliersService from '../services/suppliers.service';
import { sendJsonSuccess } from '../helpers/responseHandler';
import { ISupplier } from '../types/models';

/**
 * Lấy tất cả các nhà cung cấp
 */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const suppliers = await suppliersService.findAll();
        sendJsonSuccess(res)(suppliers);
    } catch (error) {
        next(error);
    }
};

/**
 * Lấy một nhà cung cấp bằng ID
 */
const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const supplier = await suppliersService.findById(id);
        sendJsonSuccess(res)(supplier);
    } catch (error) {
        next(error);
    }
};

/**
 * Tạo một nhà cung cấp mới
 */
const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: ISupplier = req.body;
        const supplier = await suppliersService.create(payload);
        sendJsonSuccess(res)(supplier);
    } catch (error) {
        next(error);
    }
};

/**
 * Cập nhật một nhà cung cấp bằng ID
 */
const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload: ISupplier = req.body;
        const supplier = await suppliersService.updateById(id, payload);
        sendJsonSuccess(res)(supplier);
    } catch (error) {
        next(error);
    }
};

/**
 * Xóa một nhà cung cấp bằng ID
 */
const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const supplier = await suppliersService.deleteById(id);
        sendJsonSuccess(res)(supplier);
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