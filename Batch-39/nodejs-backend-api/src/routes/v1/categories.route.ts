import express from 'express'
import categoriesController from '../../controllers/categories.controller'
import Product from '../../models/products.model'
const router = express.Router()


router.get('/testdb', async (req, res)=>{
  const products = await Product.find()
  //.populate('category') // lấy tất cả trường bên Category qua
  .populate('category', 'category_name -_id')
  .populate('brand')
  .select('-__v')
  .sort({
    //price: 1 //1 là tăng dần
    price: -1 // giảm dần
  })
  .lean({virtuals: true})
  console.log('<<=== 🚀 products ===>>',products.length, products, );    
  res.status(200).json({
    data: products
  })
})

//1. Get All Categories
//GET localhost:8080/api/v1/categories
router.get('', categoriesController.findAll)

//2. Get One Category
//GET localhost:8080/api/v1/categories/:id
router.get('/:id', categoriesController.findById)


//3. Create a new category
//POST localhost:8080/api/v1/categories
router.post('', categoriesController.createRecord)

//4. Update a category
//PUT localhost:8080/api/v1/categories/:id
router.put('/:id', categoriesController.updateById)

//5. Delete a category
//DELETE localhost:8080/api/v1/categories/:id
router.delete('/:id', categoriesController.deleteById)

export default router