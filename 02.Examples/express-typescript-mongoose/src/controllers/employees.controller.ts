import { NextFunction, Request, Response } from 'express';
import employeesService from '../services/employees.service';
import { sendJsonSuccess } from '../helpers/responseHandler';
/**
 * Get All Employees
 */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employees = await employeesService.findAll();
      // res.status(200).json({
      //   statusCode: "0",
      //   message: 'success',
      //   data: employees
      // });
      sendJsonSuccess(res)(employees);
    } catch (error) {
      next(error)
    }
     
}

/**
 * Get All Employees
 */
const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
     const {id} = req.params;
     console.log('getEmployeeById',id)
      const employee = await employeesService.findById(id);
      sendJsonSuccess(res)(employee);
    } catch (error) {
      next(error)
    }
     
}
const create =  async (req: Request, res: Response, next: NextFunction) => {
  try {  
    const payload = req.body;
    const employee = await employeesService.create(payload)
    sendJsonSuccess(res)(employee);
  } catch (error) {
    next(error)
  }
}

const updateById =  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const payload = req.body;
     const employee = await employeesService.updateById(id, payload);
     sendJsonSuccess(res)(employee);
   } catch (error) {
     next(error)
   }
}

const deleteById =  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
     const employee = await employeesService.deleteById(id);
     sendJsonSuccess(res)(employee);
   } catch (error) {
     next(error)
   }
}


export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
