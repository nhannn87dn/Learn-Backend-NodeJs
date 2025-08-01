import { NextFunction, Request, Response } from "express";
import customerService from "../services/customer.service";
import { sendJsonSuccess } from "../helpers/response.helper";

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = await customerService.findAll(req.query);
        sendJsonSuccess(res, customers);
    } catch (error) {
        next(error);
    }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const customer = await customerService.findById(id);
        sendJsonSuccess(res, customer);
    } catch (error) {
        next(error);
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = await customerService.create(req.body);
        sendJsonSuccess(res, customer, 'Customer created successfully', 201);
    } catch (error) {
        next(error);
    }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const customer = await customerService.updateById(id, req.body);
        sendJsonSuccess(res, customer, 'Customer updated successfully');
    } catch (error) {
        next(error);
    }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const customer = await customerService.deleteById(id);
        sendJsonSuccess(res, customer, 'Customer deleted successfully');
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
