import {Request, Response, NextFunction} from 'express'
import brandsService from '../services/brands.service';

import {sendJsonSuccess} from '../helpers/responseHandler'

const findAll = async (req: Request, res: Response, next: NextFunction)=>{
  
  try {
    // Lấy data từ lớp service
    const brands = await brandsService.findAll();
    console.log('<<=== 🚀findAll brands  ===>>',brands);
    //Trả lại cho client
    // res.status(200).json({
    //   data: brands
    // })
    sendJsonSuccess(res, "success")(brands)

  } catch (error) {
    next(error)
  }
  

}

const findById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params;
    /**
     * SELECT * FROM brands WHERE id = ''
     */
    const category = await brandsService.findById(parseInt(id))
    
    res.status(200).json({
    data: category
    })
  } catch (error) {
    next(error)
  }
}

const createRecord = async (req: Request, res: Response, next: NextFunction)=>{
 try {
  console.log('<<=== 🚀 req.body ===>>',req.body);
  
  const category =  await brandsService.create(req.body)
  
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

    const category = await brandsService.updateById(parseInt(id), req.body)

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
    
    const category = await brandsService.deleteById(parseInt(id))

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
  createRecord,
  updateById,
  deleteById
}