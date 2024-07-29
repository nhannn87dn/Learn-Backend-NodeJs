import { categories } from './../../../../Batch-37-38/project-restful-apis/src/seeds/category';
import {Request, Response, NextFunction} from 'express'
import createError from 'http-errors'
import categoriesService from '../services/categories.service';
import fs from "node:fs"

const fileName = './src/databases/categories.json'
const cates: any[] = []

const findAll =  (req: Request, res: Response, next: NextFunction)=>{
  console.log('<<=== 🚀findAll  ===>>',findAll);
  try {
    // Lấy data từ lớp service
    const categories = categoriesService.findAll();
    //Trả lại cho client
    res.status(200).json({
    data: categories
    })
  } catch (error) {
    next(error)
  }
  

}

const findById = (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params;
  
    const category = categoriesService.findById(parseInt(id))
    
    res.status(200).json({
    data: category
    })
  } catch (error) {
    next(error)
  }
}

const createRecord =  (req: Request, res: Response, next: NextFunction)=>{
 try {
  console.log('<<=== 🚀 req.body ===>>',req.body);
  
  const category =  categoriesService.createRecord(req.body)
  
  console.log('<<=== 🚀 category controller ===>>',category);

  res.status(201).json({
    data: category
  })
 } catch (error) {
  next(error)
 }
  
}

const updateById = (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params

    const category = categoriesService.updateById(parseInt(id), req.body)

    //Thành công
    res.status(200).json({
      data: category
    })

  } catch (error) {
    //Chuyển lỗi qua cho handler error trong app.ts xử lý
    next(error)
  }
  
}

const deleteById = (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params
    
    const category = categoriesService.deleteById(parseInt(id))

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