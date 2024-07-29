import {Request, Response, NextFunction} from 'express'
import createError from 'http-errors'

const cates = [
  {id: 1, name: 'Laptop', desc: 'Laptop gia re da nang'},
  {id: 2, name: 'Mobile', desc: 'Mobile gia re da nang'},
  {id: 3, name: 'Watch', desc: 'Watch gia re da nang'}
]

const findAll =  (req: Request, res: Response, next: NextFunction)=>{
  res.status(200).json({
   data: cates
  })
}

const findOne = (req: Request, res: Response, next: NextFunction)=>{
  const {id} = req.params
  const category = cates.find(c => c.id === parseInt(id))

  console.log('<<=== 🚀 category ===>>',category);

  /* Bắt lỗi khi ko tìm thấy thông tin */
  if(!category){
    throw createError(400, 'Category Not Found')
  }
  
  res.status(200).json({
   data: category
  })
}

const createRecord = (req: Request, res: Response, next: NextFunction)=>{
  console.log('<<=== 🚀 req.body ===>>',req.body);
  res.status(201).json({
    data: req.body
  })
}

const updateRecord = (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params
    const payload = req.body
    //b1.Kiểm tra sự tồn tại của danh mục có id này
    const category = cates.find(c => c.id === parseInt(id))
    console.log('<<=== 🚀 category ===>>',category);

    /* Bắt lỗi khi ko tìm thấy thông tin */
    if(!category){
      throw createError(400, 'Category Not Found')
    }

    //b2: Update
    const updated_cates = cates.map((c)=> {
      if (c.id === parseInt(id)){
          c.name = payload.name
      }
      return c
    })

    //Thành công
    res.status(200).json({
      data: updated_cates
    })

  } catch (error) {
    //Chuyển lỗi qua cho handler error trong app.ts xử lý
    next(error)
  }
  
}

const deleteRecord = (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {id} = req.params
    //b1 Kiểm tra xem tồn tại category có id
    const category = cates.find(c => c.id === parseInt(id))

    if(!category){
      throw createError(400, "Category Not Found")
    }

    //b2 Nếu tồn tại thì xóa
    const new_category = cates.filter(c=> c.id !== parseInt(id))

    console.log('<<=== 🚀 new_category ===>>',new_category);

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
  findOne,
  createRecord,
  updateRecord,
  deleteRecord
}