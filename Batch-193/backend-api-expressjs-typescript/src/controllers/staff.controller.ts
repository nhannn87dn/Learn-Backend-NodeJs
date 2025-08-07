import { NextFunction, Request, Response } from "express";
import staffService from "../services/staffs.service";
import { sendJsonSuccess } from "../helpers/response.helper";

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('2');
        const staffs = await staffService.findAll(req.query);
        sendJsonSuccess(res, staffs);
    } catch (error) {
        next(error);
    }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const staff = await staffService.findById(id);
        sendJsonSuccess(res, staff);
    } catch (error) {
        next(error);
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const staff = await staffService.create(req.body);
        sendJsonSuccess(res, staff, 'Staff created successfully', 201);
    } catch (error) {
        next(error);
    }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const staff = await staffService.updateById(id, req.body);
        sendJsonSuccess(res, staff, 'Staff updated successfully');
    } catch (error) {
        next(error);
    }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const staff = await staffService.deleteById(id);
        sendJsonSuccess(res, staff, 'Staff deleted successfully');
    } catch (error) {
        next(error);
    }
};

const addRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const staff = await staffService.addRole(id, role);
        sendJsonSuccess(res, staff, 'Role added successfully');
    } catch (error) {
        next(error);
    }
};

const removeRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const staff = await staffService.removeRole(id, role);
        sendJsonSuccess(res, staff, 'Role removed successfully');
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
    addRole,
    removeRole
};
