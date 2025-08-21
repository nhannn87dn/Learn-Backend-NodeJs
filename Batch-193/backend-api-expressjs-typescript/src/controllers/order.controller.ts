import { NextFunction, Request, Response } from "express";
import orderService from "../services/order.service";
import { sendJsonSuccess } from "../helpers/response.helper";

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderService.findAll(req.query);
        sendJsonSuccess(res, orders);
    } catch (error) {
        next(error);
    }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const order = await orderService.findById(id);
        sendJsonSuccess(res, order);
    } catch (error) {
        next(error);
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderService.create(req.body);
        //TODO: send email
        sendJsonSuccess(res, order, 'Order created successfully', 201);
    } catch (error) {
        next(error);
    }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const order = await orderService.updateById(id, req.body);
        sendJsonSuccess(res, order, 'Order updated successfully');
    } catch (error) {
        next(error);
    }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const order = await orderService.deleteById(id);
        sendJsonSuccess(res, order, 'Order deleted successfully');
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
