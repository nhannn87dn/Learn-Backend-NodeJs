import express from 'express';
import createError from 'http-errors';

const router = express.Router();

const categories = [
    {
        id: 1,
        name: 'Category 1'
    },
    {
        id: 2,
        name: 'Category 2'
    }
]

// Get All Categories
// GET /api/v1/categories
router.get('/categories', (req, res) => {
  //res.send('Retrieve all categories');
  res.status(200).json(categories);
});

// Get Category by Id
router.get('/categories/:id', (req, res) => {
    const {id} = req.params;
    const category = categories.find(category => category.id == Number(id));
    //Nếu không tìm thấy category thì trả về lỗi 404
    if(!category){
       ///throw new Error('Category not found');
        throw createError(400, 'Category not found');
    }
    res.status(200).json(category);
 
});

export default router;