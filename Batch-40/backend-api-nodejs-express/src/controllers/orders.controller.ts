import { NextFunction, Request, Response } from 'express';
import { httpStatus, sendJsonSuccess } from '../helpers/response.helper';
import ordersService from '../services/orders.service';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await ordersService.getAll(req.query);
        sendJsonSuccess(res, orders);
    } catch (error) {
        next(error);
    }
}

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const order = await ordersService.getById(id);
        sendJsonSuccess(res, order);
    } catch (error) {
        next(error);
    }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const order = await ordersService.create(payload);
        sendJsonSuccess(res, order,httpStatus.CREATED.statusCode,httpStatus.CREATED.message)
    } catch (error) {
        next(error);
    }
}

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const order = await ordersService.updateById(id, payload);
        sendJsonSuccess(res, order);
    } catch (error) {
        next(error);
    }
}

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const order = await ordersService.deleteById(id);
        sendJsonSuccess(res, order);
    } catch (error) {
        next(error);
    }
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}