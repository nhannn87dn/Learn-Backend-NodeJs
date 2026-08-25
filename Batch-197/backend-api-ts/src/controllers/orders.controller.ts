import { type NextFunction, type Request, type Response } from 'express';
import { sendJsonSuccess, SUCCESS } from '../helpers/response.helper';
import ordersService from '../services/orders.service';

const getAllOrders = async (req: Request, res: Response, next: NextFunction) => { try { sendJsonSuccess(res, await ordersService.findAll(req.query)); } catch (error) { next(error); } };
const getOrderById = async (req: Request, res: Response, next: NextFunction) => { try { sendJsonSuccess(res, await ordersService.findById(String(req.params.id))); } catch (error) { next(error); } };
const createOrder = async (req: Request, res: Response, next: NextFunction) => { try { sendJsonSuccess(res, await ordersService.create(req.body), SUCCESS.CREATED); } catch (error) { next(error); } };
const updateOrderById = async (req: Request, res: Response, next: NextFunction) => { try { sendJsonSuccess(res, await ordersService.updateById(String(req.params.id), req.body)); } catch (error) { next(error); } };
const deleteOrderById = async (req: Request, res: Response, next: NextFunction) => { try { sendJsonSuccess(res, await ordersService.deleteById(String(req.params.id))); } catch (error) { next(error); } };
export default { getAllOrders, getOrderById, createOrder, updateOrderById, deleteOrderById };