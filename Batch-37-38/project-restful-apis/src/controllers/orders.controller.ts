import {Request,Response, NextFunction} from 'express'
import ordersService from '../services/orders.service';


const getAll = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await ordersService.getAll();
        console.log('result',result);
        res.status(200).json(result)
    }
    catch(err){
        next(err)
    }
}

const getOrderById = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params; //return id = string

        const order = await ordersService.getOrderById(id)

        res.status(200).json(order)
    }
    catch(err){
        next(err)
    }
}

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        const order=  await ordersService.createOrder(data)

        res.status(201).json({
            message: `Created Order`,
            order: order
        })
    }
    catch(err){
        next(err)
    }
}

const updateOrder = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params;
        const data = req.body;

        
        const order = await ordersService.updateOrder(id,data)

        res.status(200).json({
            message: `Update Order by ID ${id}`,
            order: order
        })
    }
    catch(err){
        next(err)
    }
}

const deleteOrder = async (req: Request, res: Response,next: NextFunction)=>{
    try {
        const {id} = req.params;
        const order = await ordersService.deleteOrder(id)
        res.status(200).json({
            message: `Delete Order by ID ${id}`,
            order: order
        })
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