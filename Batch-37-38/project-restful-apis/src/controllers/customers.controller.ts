import {Request,Response, NextFunction} from 'express'
import customersService from '../services/customers.service';


const getAll = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await customersService.getAll();
        console.log('result',result);
        res.status(200).json(result)
    }
    catch(err){
        next(err)
    }
}

const getCustomerById = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params; //return id = string

        const customer = await customersService.getCustomerById(id)

        res.status(200).json(customer)
    }
    catch(err){
        next(err)
    }
}

const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        const customer=  await customersService.createCustomer(data)

        res.status(201).json({
            message: `Created Customer`,
            customer: customer
        })
    }
    catch(err){
        next(err)
    }
}

const updateCustomer = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params;
        const data = req.body;

        
        const customer = await customersService.updateCustomer(id,data)

        res.status(200).json({
            message: `Update Customer by ID ${id}`,
            customer: customer
        })
    }
    catch(err){
        next(err)
    }
}

const deleteCustomer = async (req: Request, res: Response,next: NextFunction)=>{
    try {
        const {id} = req.params;
        const customer = await customersService.deleteCustomer(id)
        res.status(200).json({
            message: `Delete Customer by ID ${id}`,
            customer: customer
        })
    }
    catch(err){
        next(err)
    }
}

export default {
    getAll,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}