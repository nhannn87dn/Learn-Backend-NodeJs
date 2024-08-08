import {Request, Response, NextFunction} from 'express'
import staffsService from '../services/staffs.service';
import {sendJsonSuccess} from '../helpers/responseHandler'

const findAll = async (req: Request, res: Response, next: NextFunction)=>{
  
  try {
    // Lấy data từ lớp service
    const staffs = await staffsService.findAll();
    //console.log('<<=== 🚀findAll staffs  ===>>',staffs);
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
    console.log('findById', req.params);
    const {id} = req.params;
    /**
     * SELECT * FROM staffs WHERE id = ''
     */
    const staff = await staffsService.findById(id)
    
    res.status(200).json({
    data: staff
    })
  } catch (error) {
    next(error)
  }
}

const createRecord = async (req: Request, res: Response, next: NextFunction)=>{
 try {
  console.log('<<=== 🚀 req.body ===>>',req.body);
  
  const staff =  await staffsService.createRecord(req.body)
  
  console.log('<<=== 🚀 staff controller ===>>',staff);

  res.status(201).json({
    data: staff
  })
 } catch (error) {
  next(error)
 }
  
}

const updateById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params

    const staff = await staffsService.updateById(id, req.body)

    //Thành công
    res.status(200).json({
      data: staff
    })

  } catch (error) {
    //Chuyển lỗi qua cho handler error trong app.ts xử lý
    next(error)
  }
  
}

const deleteById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params
    
    const staff = await staffsService.deleteById(id)

    res.status(200).json({
        //Trả về phần tử vừa được xóa
        data: staff
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