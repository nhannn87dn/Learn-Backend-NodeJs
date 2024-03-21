import {Request,Response, NextFunction} from 'express'
import ordersService from '../services/orders.service';
import { sendJsonSuccess } from '../helpers/responseHandler';


const getAll = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await ordersService.getAll(req.query);
        console.log('result',result);
        //res.status(200).json(result)
        sendJsonSuccess(res)(result)
    }
    catch(err){
        next(err)
    }
}

const getOrderById = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params; //return id = string
        const result = await ordersService.getOrderById(id)

        //res.status(200).json(order)
        sendJsonSuccess(res)(result)
    }
    catch(err){
        next(err)
    }
}

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        const order=  await ordersService.createOrder(data)

        // res.status(201).json({
        //     message: `Created Order`,
        //     order: order
        // })
        sendJsonSuccess(res, 'Create Order successfully', 201)(order)
    }
    catch(err){
        next(err)
    }
}

const updateOrder = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params;
        const data = req.body;

        
        const result = await ordersService.updateOrder(id,data)

        // res.status(200).json({
        //     message: `Update Order by ID ${id}`,
        //     order: order
        // })
        sendJsonSuccess(res)(result)
    }
    catch(err){
        next(err)
    }
}

const deleteOrder = async (req: Request, res: Response,next: NextFunction)=>{
    try {
        const {id} = req.params;
        const result = await ordersService.deleteOrder(id)
        // res.status(200).json({
        //     message: `Delete Order by ID ${id}`,
        //     order: order
        // })
        sendJsonSuccess(res)(result)
    }
    catch(err){
        next(err)
    }
}

export default {
    getAll,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}