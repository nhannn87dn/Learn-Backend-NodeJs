import {Request, Response, NextFunction} from 'express'
import staffsService from '../services/staffs.service';

import {sendJsonSuccess} from '../helpers/responseHandler'

const findAll = async (req: Request, res: Response, next: NextFunction)=>{
  
  try {
    // Lấy data từ lớp service
    const staffs = await staffsService.findAll(req.query);
    console.log('<<=== 🚀findAll staffs  ===>>',staffs);
    //Trả lại cho client
    // res.status(200).json({
    //   data: staffs
    // })
    sendJsonSuccess(res, "success")(staffs)

  } catch (error) {
    next(error)
  }
  

}

const findById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params;
    /**
     * SELECT * FROM staffs WHERE id = ''
     */
    const category = await staffsService.findById(id)
    
    res.status(200).json({
    data: category
    })
  } catch (error) {
    next(error)
  }
}

const createDocument = async (req: Request, res: Response, next: NextFunction)=>{
 try {
  console.log('<<=== 🚀 req.body ===>>',req.body);
  
  const category =  await staffsService.createDocument(req.body)
  
  console.log('<<=== 🚀 category controller ===>>',category);

  res.status(201).json({
    data: category
  })
 } catch (error) {
  next(error)
 }
  
}

const updateById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params

    const category = await staffsService.updateById(id, req.body)

    //Thành công
    res.status(200).json({
      data: category
    })

  } catch (error) {
    //Chuyển lỗi qua cho handler error trong app.ts xử lý
    next(error)
  }
  
}

const deleteById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params
    
    const category = await staffsService.deleteById(id)

    res.status(200).json({
        //Trả về phần tử vừa được xóa
        data: category
    })

  } catch (error) {
    next(error)
  }
}

export default {
  findAll,
  findById,
  createDocument,
  updateById,
  deleteById
}