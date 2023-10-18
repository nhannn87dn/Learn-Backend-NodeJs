import { NextFunction, Request, Response } from 'express';
import ordersService from '../services/orders.service';
import { sendJsonSuccess } from '../helpers/responseHandler';
import { IOrder } from '../types/models';

/**
 * Lấy tất cả các đơn hàng
 */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await ordersService.findAll();
        sendJsonSuccess(res)(orders);
    } catch (error) {
        next(error);
    }
};

/**
 * Lấy một đơn hàng bằng ID
 */
const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const order = await ordersService.findById(id);
        sendJsonSuccess(res)(order);
    } catch (error) {
        next(error);
    }
};

/**
 * Tạo một đơn hàng mới
 */
const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: IOrder = req.body;
        const order = await ordersService.create(payload);
        sendJsonSuccess(res)(order);
    } catch (error) {
        next(error);
    }
};

/**
 * Cập nhật một đơn hàng bằng ID
 */
const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload: IOrder = req.body;
        const order = await ordersService.updateById(id, payload);
        sendJsonSuccess(res)(order);
    } catch (error) {
        next(error);
    }
};

/**
 * Xóa một đơn hàng bằng ID
 */
const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const order = await ordersService.deleteById(id);
        sendJsonSuccess(res)(order);
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