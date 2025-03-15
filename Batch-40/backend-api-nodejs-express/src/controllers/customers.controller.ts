import { NextFunction, Request, Response } from 'express';
import { httpStatus, sendJsonSuccess } from '../helpers/response.helper';
import customersService from '../services/customers.service';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = await customersService.getAll(req.query);
        sendJsonSuccess(res, customers);
    } catch (error) {
        next(error);
    }
}

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const customer = await customersService.getById(id);
        sendJsonSuccess(res, customer);
    } catch (error) {
        next(error);
    }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const customer = await customersService.create(payload);
        sendJsonSuccess(res, customer,httpStatus.CREATED.statusCode,httpStatus.CREATED.message)
    } catch (error) {
        next(error);
    }
}

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const customer = await customersService.updateById(id, payload);
        sendJsonSuccess(res, customer);
    } catch (error) {
        next(error);
    }
}

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const customer = await customersService.deleteById(id);
        sendJsonSuccess(res, customer);
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