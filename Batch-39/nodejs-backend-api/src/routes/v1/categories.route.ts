import express, {Request, Response, NextFunction} from 'express'
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
    throw Error('Category Not Found')
  }
  
  res.status(200).json({
   data: category
  })
})


//3. Create a new category

//4. Update a category


//5. Delete a category

export default router