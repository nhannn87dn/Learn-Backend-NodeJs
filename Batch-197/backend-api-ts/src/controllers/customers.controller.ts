import { type NextFunction, type Request, type Response } from 'express';
import { sendJsonSuccess, SUCCESS } from '../helpers/response.helper';
import customersService from '../services/customers.service';

const getAllCustomers = async (req: Request, res: Response, next: NextFunction) => { try { sendJsonSuccess(res, await customersService.findAll(req.query)); } catch (error) { next(error); } };
const getCustomerById = async (req: Request, res: Response, next: NextFunction) => { try { sendJsonSuccess(res, await customersService.findById(String(req.params.id))); } catch (error) { next(error); } };
const createCustomer = async (req: Request, res: Response, next: NextFunction) => { try { sendJsonSuccess(res, await customersService.create(req.body), SUCCESS.CREATED); } catch (error) { next(error); } };
const updateCustomerById = async (req: Request, res: Response, next: NextFunction) => { try { sendJsonSuccess(res, await customersService.updateById(String(req.params.id), req.body)); } catch (error) { next(error); } };
const deleteCustomerById = async (req: Request, res: Response, next: NextFunction) => { try { sendJsonSuccess(res, await customersService.deleteById(String(req.params.id))); } catch (error) { next(error); } };
export default { getAllCustomers, getCustomerById, createCustomer, updateCustomerById, deleteCustomerById };