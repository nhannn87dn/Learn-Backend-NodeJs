import {Request,Response, NextFunction} from 'express'
import staffsService from '../services/staffs.service';
import { sendJsonSuccess } from '../helpers/responseHandler';

const getAll = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await staffsService.getAll(req.query);
        console.log('result',result);
        //res.status(200).json(result)
        sendJsonSuccess(res)(result)
    }
    catch(err){
        next(err)
    }
}

const getStaffById = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params; //return id = string
        const result = await staffsService.getStaffById(id)
        //res.status(200).json(staff)
        sendJsonSuccess(res)(result)
    }
    catch(err){
        next(err)
    }
}

const createStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        const staff=  await staffsService.createStaff(data)

        // res.status(201).json({
        //     message: `Created Staff`,
        //     staff: staff
        // })
        sendJsonSuccess(res, 'Create Staff successfully', 201)(staff)
    }
    catch(err){
        next(err)
    }
}

const updateStaff = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params;
        const data = req.body;
        
        const staff = await staffsService.updateStaff(id,data)

        // res.status(200).json({
        //     message: `Update Staff by ID ${id}`,
        //     staff: staff
        // })
        sendJsonSuccess(res)(staff)
    }
    catch(err){
        next(err)
    }
}

const deleteStaff = async (req: Request, res: Response,next: NextFunction)=>{
    try {
        const {id} = req.params;
        const staff = await staffsService.deleteStaff(id)
        // res.status(200).json({
        //     message: `Delete Staff by ID ${id}`,
        //     staff: staff
        // })
        sendJsonSuccess(res)(staff)
    }
    catch(err){
        next(err)
    }
}

export default {
    getAll,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff
}