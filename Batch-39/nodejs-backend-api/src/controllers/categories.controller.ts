import {Request, Response, NextFunction} from 'express'
import categoriesService from '../services/categories.service';
import {sendJsonSuccess} from '../helpers/responseHandler'

const findAll = async (req: Request, res: Response, next: NextFunction)=>{
  
  try {
    // Lấy data từ lớp service
    const categories = await categoriesService.findAll();
    //console.log('<<=== 🚀findAll categories  ===>>',categories);
    //Trả lại cho client
    // res.status(200).json({
    //   data: categories
    // })
    sendJsonSuccess(res, "success")(categories)

  } catch (error) {
    next(error)
  }
  

}


const findById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    console.log('findById', req.params);
    const {id} = req.params;
    /**
     * SELECT * FROM categories WHERE id = ''
     */
    const category = await categoriesService.findById(id)
    
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
  
  const category =  await categoriesService.createRecord(req.body)
  
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

    const category = await categoriesService.updateById(id, req.body)

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
    
    const category = await categoriesService.deleteById(id)

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