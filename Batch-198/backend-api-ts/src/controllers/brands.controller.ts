import {Request, Response, NextFunction} from "express";
import brandsService from "../services/brands.service";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const brands = await brandsService.findAll();
        sendJsonSuccess(res, brands);
    } catch (error) {
        next(error);
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const brand = await brandsService.findById(String(id));
        sendJsonSuccess(res, brand);
    } catch (error) {
        next(error);
    }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const newBrand = await brandsService.create(payload);
        sendJsonSuccess(res, newBrand, SUCCESS.CREATED);
    } catch (error) {
        next(error);
    }
}

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const updatedBrand = await brandsService.updateById(String(id), payload);
        sendJsonSuccess(res, updatedBrand);
    } catch (error) {
        next(error);
    }
}

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedBrand = await brandsService.deleteById(String(id));
        sendJsonSuccess(res, deletedBrand);
    } catch (error) {
        next(error);
    }
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}
