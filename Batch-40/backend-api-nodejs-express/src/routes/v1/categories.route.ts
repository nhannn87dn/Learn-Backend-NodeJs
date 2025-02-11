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

// Create Category
// POST /api/v1/categories
router.post('/categories', (req, res) => {
    const category = req.body;
    console.log('<<=== 🚀 category ===>>',category);
    categories.push(category);
    res.status(201).json(category);
});

// Update Category
// PUT /api/v1/categories/:id
router.put('/categories/:id', (req, res) => {
    const {id} = req.params;
    const category = categories.find(category => category.id == Number(id));
    if(!category){
        throw createError(400, 'Category not found');
    }
    const newCategory = req.body;
    const index = categories.indexOf(category);
    categories[index] = newCategory;
    res.status(200).json(newCategory);
});

// Delete Category

// DELETE /api/v1/categories/:id
router.delete('/categories/:id', (req, res) => {
    const {id} = req.params;
    const category = categories.find(category => category.id == Number(id));
    if(!category){
        throw createError(400, 'Category not found');
    }
    const index = categories.indexOf(category);
    categories.splice(index, 1);
    res.status(204).json();
});

export default router;