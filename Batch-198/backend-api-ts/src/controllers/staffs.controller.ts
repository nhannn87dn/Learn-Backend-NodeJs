import { Request, Response, NextFunction } from "express";
import staffsService from "../services/staffs.service";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const staffs = await staffsService.findAll();
        sendJsonSuccess(res, staffs);
    } catch (error) {
        next(error);
    }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const staff = await staffsService.findById(String(id));
        sendJsonSuccess(res, staff, { statusCode: SUCCESS.OK.statusCode, message: SUCCESS.OK.message });
    } catch (error) {
        next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newStaff = await staffsService.create(req.body);
        sendJsonSuccess(res, newStaff, { statusCode: SUCCESS.CREATED.statusCode, message: SUCCESS.CREATED.message });
    } catch (error) {
        next(error);
    }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updatedStaff = await staffsService.updateById(String(id), req.body);
        sendJsonSuccess(res, updatedStaff);
    } catch (error) {
        next(error);
    }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedStaff = await staffsService.deleteById(String(id));
        sendJsonSuccess(res, deletedStaff);
    } catch (error) {
        next(error);
    }
};

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
