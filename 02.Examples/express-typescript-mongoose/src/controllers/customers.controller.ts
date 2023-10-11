import { NextFunction, Request, Response } from 'express';
import customersService from '../services/customers.service';
import { sendJsonSuccess } from '../helpers/responseHandler';
import { ICustomer } from '../types/models';

/**
 * Lấy tất cả khách hàng
 */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = await customersService.findAll();
        sendJsonSuccess(res)(customers);
    } catch (error) {
        next(error);
    }
};

/**
 * Lấy thông tin khách hàng bằng ID
 */
const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const customer = await customersService.findById(id);
        sendJsonSuccess(res)(customer);
    } catch (error) {
        next(error);
    }
};

/**
 * Tạo khách hàng mới
 */
const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: ICustomer = req.body;
        const customer = await customersService.create(payload);
        sendJsonSuccess(res)(customer);
    } catch (error) {
        next(error);
    }
};

/**
 * Cập nhật thông tin khách hàng bằng ID
 */
const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload: ICustomer = req.body;
        const customer = await customersService.updateById(id, payload);
        sendJsonSuccess(res)(customer);
    } catch (error) {
        next(error);
    }
};

/**
 * Xóa khách hàng bằng ID
 */
const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const customer = await customersService.deleteById(id);
        sendJsonSuccess(res)(customer);
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