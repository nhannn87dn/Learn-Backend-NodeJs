import { NextFunction, Request, Response } from 'express';
import { httpStatus, sendJsonSuccess } from '../helpers/response.helper';
import staffsService from '../services/staffs.service';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const staffs = await staffsService.getAll(req.query);
        sendJsonSuccess(res, staffs);
    } catch (error) {
        next(error);
    }
}

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const staff = await staffsService.getById(id);
        sendJsonSuccess(res, staff);
    } catch (error) {
        next(error);
    }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const staff = await staffsService.create(payload);
        sendJsonSuccess(res, staff,httpStatus.CREATED.statusCode,httpStatus.CREATED.message)
    } catch (error) {
        next(error);
    }
}

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const staff = await staffsService.updateById(id, payload);
        sendJsonSuccess(res, staff);
    } catch (error) {
        next(error);
    }
}

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const staff = await staffsService.deleteById(id);
        sendJsonSuccess(res, staff);
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