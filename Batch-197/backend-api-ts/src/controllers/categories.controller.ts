import { type Request, type Response } from 'express';
import { TCategory } from '../types/category';
import { readFile, writeFile } from '../helpers/file.helper';
import categoriesService from '../services/categories.service';

const fileName = 'src/database/data.json';

//Get All Categories
const getAllCategories = (req: Request, res: Response) => {

    //Kết nối với service để lấy dữ liệu categories
   const categories = categoriesService.findAll();

    res
    .status(200)
    .json({ 
        statusCode: 200,
        message: 'Successfully get all categories',
        data: categories
    });
};

//Get Category by ID
const getCategoryById = (req: Request, res: Response) => {
    const { id } = req.params;

   const category = categoriesService.findById(parseInt(id as string));

    res
    .status(200)
    .json({ 
        statusCode: 200,
        message: 'successfully get category by id',
        data: category
    });
};

//create a new category
const createCategory = (req: Request, res: Response) => {
    // Lấy dữ liệu từ body của request
    const payload = req.body;
    console.log('<<=== 🚀 payload ===>>',payload);

    const category = categoriesService.create(payload);
    //response lại cho client

    res
    .status(201)
    .json({ 
        statusCode: 201,
        message: 'create a new category',
        data: category //response lại cho client category vừa được tạo
    });
};

//update a category by id
const updateCategoryById = (req: Request, res: Response) => {
    //lấy id cần update
    const { id } = req.params;
    // Lấy dữ liệu từ body của request
    const payload = req.body;
    console.log('<<=== 🚀 payload ===>>',payload);
    const categoryUpdated = categoriesService.updateById(parseInt(id as string), payload);
    
    res
    .status(200)
    .json({ 
        statusCode: 200,
        message: 'update a category by id',
        data: categoryUpdated //response lại cho client category vừa được update 
    });
};

//delete a category by id
const deleteCategoryById = (req: Request, res: Response) => {
    const { id } = req.params;

    const category = categoriesService.deleteById(parseInt(id as string));
    
    res
    .status(200)
    .json({ 
        statusCode: 200,
        message: 'delete category successfully',
        data: category //trả lại cho client category vừa được delete
    });
};

export default {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById
}