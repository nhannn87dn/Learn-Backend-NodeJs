import { type NextFunction, type Request, type Response } from 'express';
import { sendJsonSuccess, SUCCESS } from '../helpers/response.helper';
import staffsService from '../services/staffs.service';

const getAllStaffs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const staffs = await staffsService.findAll(req.query);
        sendJsonSuccess(res, staffs);
    }
    catch (error) {
        next(error);
    }
};

const getStaffById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const staff = await staffsService.findById(String(id));
        sendJsonSuccess(res, staff);
    }
    catch (error) {
        next(error);
    }
};

const createStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const staff = await staffsService.create(payload);
        sendJsonSuccess(res, staff, SUCCESS.CREATED);
    }
    catch (error) {
        next(error);
    }
};

const updateStaffById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const staff = await staffsService.updateById(String(id), payload);
        sendJsonSuccess(res, staff);
    }
    catch (error) {
        next(error);
    }
};

const deleteStaffById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const staff = await staffsService.deleteById(String(id));
        sendJsonSuccess(res, staff);
    }
    catch (error) {
        next(error);
    }
};

export default {
    getAllStaffs,
    getStaffById,
    createStaff,
    updateStaffById,
    deleteStaffById,
};