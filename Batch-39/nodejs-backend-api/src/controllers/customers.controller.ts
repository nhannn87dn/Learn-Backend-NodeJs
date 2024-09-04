import {Request, Response, NextFunction} from 'express'
import customersService from '../services/customers.service';
import {sendJsonSuccess} from '../helpers/responseHandler'

const findAll = async (req: Request, res: Response, next: NextFunction)=>{
  
  try {
    // Lấy data từ lớp service
    const customers = await customersService.findAll();
    //console.log('<<=== 🚀findAll customers  ===>>',customers);
    //Trả lại cho client
    // res.status(200).json({
    //   data: customers
    // })
    sendJsonSuccess(res, "success")(customers)

  } catch (error) {
    next(error)
  }
  

}

const findById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    console.log('findById', req.params);
    const {id} = req.params;
    /**
     * SELECT * FROM customers WHERE id = ''
     */
    const customer = await customersService.findById(id)
    
    res.status(200).json({
    data: customer
    })
  } catch (error) {
    next(error)
  }
}

const createRecord = async (req: Request, res: Response, next: NextFunction)=>{
 try {
  console.log('<<=== 🚀 req.body ===>>',req.body);
  
  const customer =  await customersService.createRecord(req.body)
  
  console.log('<<=== 🚀 customer controller ===>>',customer);

  res.status(201).json({
    data: customer
  })
 } catch (error) {
  next(error)
 }
  
}

const updateById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params

    const customer = await customersService.updateById(id, req.body)

    //Thành công
    res.status(200).json({
      data: customer
    })

  } catch (error) {
    //Chuyển lỗi qua cho handler error trong app.ts xử lý
    next(error)
  }
  
}

const deleteById = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params
    
    const customer = await customersService.deleteById(id)

    res.status(200).json({
        //Trả về phần tử vừa được xóa
        data: customer
    })

  } catch (error) {
    next(error)
  }
}


const login = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {email, password} = req.body;

    const tokens = await customersService.login(email, password);
    sendJsonSuccess(res)(tokens);

  } catch (error) {
    next(error)
  }
}


const profile = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {_id} = res.locals.customer;
    console.log(`req.customer`,res.locals.customer);

    const result = await customersService.getProfile(_id)
    sendJsonSuccess(res)(result);

  } catch (error) {
    next(error)
  }
}



const refreshToken = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const customer = res.locals.customer;
    console.log(`req.customer`,res.locals.customer);

    const tokens = await customersService.getTokens(customer)

    //tạo cặp token mới
    sendJsonSuccess(res)(tokens);

  } catch (error) {
    next(error)
  }
}

export default {
  findAll,
  findById,
  createRecord,
  updateById,
  deleteById,
  login,
  profile,
  refreshToken
}