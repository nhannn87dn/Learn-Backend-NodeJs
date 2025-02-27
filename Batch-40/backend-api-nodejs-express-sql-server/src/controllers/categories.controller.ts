import { NextFunction, Request, Response } from 'express';
import { httpStatus, sendJsonSuccess } from '../helpers/response.helper';
import categoriesService from '../services/categories.service';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await categoriesService.getAll(req.query);
        sendJsonSuccess(res, categories);
    } catch (error) {
        next(error);
    }
}

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const category = await categoriesService.getById(id);
        sendJsonSuccess(res, category);
    } catch (error) {
        next(error);
    }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const category = await categoriesService.create(payload);
        sendJsonSuccess(res, category,httpStatus.CREATED.statusCode,httpStatus.CREATED.message)
    } catch (error) {
        next(error);
    }
}

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const category = await categoriesService.updateById(id, payload);
        sendJsonSuccess(res, category);
    } catch (error) {
        next(error);
    }
}

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const category = await categoriesService.deleteById(id);
        sendJsonSuccess(res, category);
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