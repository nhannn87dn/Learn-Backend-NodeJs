import {Request, Response, NextFunction} from 'express'
import ordersService from '../services/orders.service';

import {sendJsonSuccess} from '../helpers/responseHandler'

const findAll = async (req: Request, res: Response, next: NextFunction)=>{
  
  try {
    // Lấy data từ lớp service
    const orders = await ordersService.findAll(req.query);
    console.log('<<=== 🚀findAll orders  ===>>',orders);
    //Trả lại cho client
    // res.status(200).json({
    //   data: orders
    // })
    sendJsonSuccess(res, "success")(orders)

  } catch (error) {
    next(error)
  }
  

}

const findById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params;
    /**
     * SELECT * FROM orders WHERE id = ''
     */
    const order = await ordersService.findById(id)
    
    sendJsonSuccess(res, "success")(order)
  } catch (error) {
    next(error)
  }
}

const createRecord = async (req: Request, res: Response, next: NextFunction)=>{
 try {
  console.log('<<=== 🚀 req.body ===>>',req.body);
  
  const order =  await ordersService.createRecord(req.body)
  
  console.log('<<=== 🚀 order controller ===>>',order);

  res.status(201).json({
    data: order
  })
 } catch (error) {
  next(error)
 }
  
}

const updateById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params

    const order = await ordersService.updateById(id, req.body)

    //Thành công
    res.status(200).json({
      data: order
    })

  } catch (error) {
    //Chuyển lỗi qua cho handler error trong app.ts xử lý
    next(error)
  }
  
}

const deleteById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params
    
    const order = await ordersService.deleteById(id)

    res.status(200).json({
        //Trả về phần tử vừa được xóa
        data: order
    })

  } catch (error) {
    next(error)
  }
}

export default {
  findAll,
  findById,
  createRecord,
  updateById,
  deleteById
}