import { Request, Response } from "express"
import createError from 'http-errors';
import customersService from "../services/customers.service";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";

/** Get All Customers */
const findAll = async (req: Request, res: Response) => {
    const customers = await customersService.findAll(req.query);
    sendJsonSuccess({
        res,
        data: customers
    })
}

/* Find a customer by id */
const findById = async (req: Request, res: Response) => {
    const { id } = req.params; //id nhận được luôn là string
    //Đảm bảo có id 
    if (!id) {
        throw createError(400, "ID not found")
    }

    const customer = await customersService.findById({ id })

    sendJsonSuccess({
        res,
        data: customer
    })
}

//create a new customer
const create = async (req: Request, res: Response) => {
    console.log('<===== req.body =====>', req.body);
    const newCustomer = await customersService.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        password: req.body.password,
        active: req.body.active,
    });

    sendJsonSuccess({
        res,
        status: SUCCESS.CREATED,
        data: newCustomer
    })
}

/* Update a customer by Id */
const updateById = async (req: Request, res: Response) => {
    console.log(req.params, req.body);
    const { id } = req.params;
    //Đảm bảo có id 
    if (!id) {
        throw createError(400, "ID not found")
    }

    const customer = await customersService.updateById({
        id,
        payload: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip_code: req.body.zip_code,
            password: req.body.password,
            active: req.body.active,
        }
    })

    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: customer
    })
}

/* Delete a customer by Id */
const deleteById = async (req: Request, res: Response) => {
    //step1: check xem id co ton tai khong
    const { id } = req.params;
    //Đảm bảo có id 
    if (!id) {
        throw createError(400, "ID not found")
    }
    //step1: Check xem trong db co ton tai record co id khong
    const customer = await customersService.deleteById(id)
    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: customer
    })
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}
