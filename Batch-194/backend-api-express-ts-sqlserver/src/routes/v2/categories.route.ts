import express, {Router} from 'express';
import createError from 'http-errors';

const router = express.Router() as Router;

let fake_categories = [
    {id: 1, name: "Clothes"},
    {id: 2, name: "Electronics"},
    {id: 3, name: "Books"},
    {id: 4, name: "Furniture"},
    {id: 5, name: "Shoes"},
    {id: 6, name: "Others"},
]

//GET api/v1/categories ==> get all categories
router.get('/', (req, res) => {
    res.json({
        data: fake_categories
    })
})
//GET api/v1/categories/:id ==> get category by id
router.get('/:id', (req, res) => {
    const {id} = req.params; //id nhận được luôn là string
    const category = fake_categories.find((category) => category.id === parseInt(id));
    //Phải kiểm tra xem có tồn tại thật không. Nếu không thì trả về 404.
    if (!category) {
       throw createError(404, "Category not found")
    }
    res.json({
        data: category
    })
})

//POST api/v1/categories ==> create new category
router.post('/', (req, res) => {
   console.log('<===== req.body =====>', req.body);
   const newCategory = {
    id: fake_categories.length + 1,
    name: req.body.name
   }
   fake_categories.push(newCategory)
   //Note: Tạo mới thì status nên là 201
    res.status(201).json({
        data: newCategory,
        categories: fake_categories
    })
})

//PUT api/v1/categories/:id ==> Update a category
router.put('/:id',(req, res)=>{
    console.log(req.params, req.body);
    const {id} = req.params;
    //step1: Check xem trong db co ton tai record co id khong
    let category = fake_categories.find(c => c.id === parseInt(id));
    if(!category){
        throw createError(404, "Category not found")
    }

    //Step 2: Xử lý khi có tồn tại
    category = {...category, name: req.body.name}

    res.json({
        data: category
    })
})

//DELETE api/v1/categories/:id ==> Delete a category by id
router.delete('/:id',(req, res)=>{
    //step1: check xem id co ton tai khong
    const {id} = req.params;
    //step1: Check xem trong db co ton tai record co id khong
    let category = fake_categories.find(c => c.id === parseInt(id));
    if(!category){
        throw createError(404, "Category not found")
    }
    //step2: Xoa neu co ton tai
    const results = fake_categories.filter(c => c.id !== parseInt(id))
    res.json({
        data: results
    })
})

export default router;