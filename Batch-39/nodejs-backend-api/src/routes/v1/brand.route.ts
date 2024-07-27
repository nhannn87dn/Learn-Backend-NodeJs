import express, {Request, Response, NextFunction} from 'express'
const router = express.Router()

const brands = [
  {id: 1, name: 'Asus', desc: 'Laptop Asus gia re da nang'},
  {id: 2, name: 'Dell', desc: 'Laptop Dell gia re da nang'},
  {id: 3, name: 'Apple', desc: 'Laptop Apple gia re da nang'}
]

//1. Get All brands
router.get('/brands', (req: Request, res: Response, next: NextFunction)=>{
   res.status(200).json({
    data: brands
   })
})

//2. Get One brands
//3. Create a new brands
//4. Update a brands
//5. Delete a brands

export default router