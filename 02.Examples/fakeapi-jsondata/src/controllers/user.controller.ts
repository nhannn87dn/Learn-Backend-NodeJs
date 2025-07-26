import { NextFunction, Request, Response } from "express";
import userService from "../services/users.service";
import { sendJsonSuccess } from "../helpers/response.helper";

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('2');
        const users = await userService.findAll();
        sendJsonSuccess(res, users);
    } catch (error) {
        next(error);
    }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await userService.findById(id);
        sendJsonSuccess(res, user);
    } catch (error) {
        next(error);
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.create(req.body);
        sendJsonSuccess(res, user, 'User created successfully', 201);
    } catch (error) {
        next(error);
    }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await userService.updateById(id, req.body);
        sendJsonSuccess(res, user, 'User updated successfully');
    } catch (error) {
        next(error);
    }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await userService.deleteById(id);
        sendJsonSuccess(res, user, 'User deleted successfully');
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
