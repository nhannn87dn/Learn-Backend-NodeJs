import express, {Request, Response, NextFunction} from 'express'
import createError from 'http-errors'

const router = express.Router()

const cates = [
  {id: 1, name: 'Laptop', desc: 'Laptop gia re da nang'},
  {id: 2, name: 'Mobile', desc: 'Mobile gia re da nang'},
  {id: 3, name: 'Watch', desc: 'Watch gia re da nang'}
]

//1. Get All Categories
//GET localhost:8080/api/v1/categories
router.get('/categories', (req: Request, res: Response, next: NextFunction)=>{
   res.status(200).json({
    data: cates
   })
})

//2. Get One Category
//GET localhost:8080/api/v1/categories/:id
router.get('/categories/:id', (req: Request, res: Response, next: NextFunction)=>{
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
})


//3. Create a new category
//POST localhost:8080/api/v1/categories
router.post('/categories', (req: Request, res: Response, next: NextFunction)=>{
  console.log('<<=== 🚀 req.body ===>>',req.body);
  res.status(201).json({
    data: req.body
  })
})

//4. Update a category
//PUT localhost:8080/api/v1/categories/:id
router.put('/categories/:id', (req: Request, res: Response, next: NextFunction)=>{
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
  
})

//5. Delete a category
//DELETE localhost:8080/api/v1/categories/:id
router.delete('/categories/:id', (req: Request, res: Response, next: NextFunction)=>{
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
})

export default router