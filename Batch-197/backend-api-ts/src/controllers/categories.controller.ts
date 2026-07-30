import { type Request, type Response } from 'express';
import categoriesService from '../services/categories.service';
import { sendJsonSuccess, SUCCESS } from '../helpers/response.helper';
//Get All Categories
const getAllCategories = async(req: Request, res: Response) => {

    //Kết nối với service để lấy dữ liệu categories
   const categories = await categoriesService.findAll();

    // res
    // .status(200)
    // .json({ 
    //     statusCode: 200,
    //     message: 'Successfully get all categories',
    //     data: categories
    // });
    sendJsonSuccess(res, categories)
};

//Get Category by ID
const getCategoryById = (req: Request, res: Response) => {
    const { id } = req.params;

   const category = categoriesService.findById(parseInt(id as string));

    // res
    // .status(200)
    // .json({ 
    //     statusCode: 200,
    //     message: 'successfully get category by id',
    //     data: category
    // });
    sendJsonSuccess(res, category)
};

//create a new category
const createCategory = async(req: Request, res: Response) => {
    // Lấy dữ liệu từ body của request
    const payload = req.body;
    console.log('<<=== 🚀 payload ===>>',payload);

    const category = await categoriesService.create(payload);
    //response lại cho client

    // res
    // .status(201)
    // .json({ 
    //     statusCode: 201,
    //     message: 'create a new category',
    //     data: category //response lại cho client category vừa được tạo
    // });
    sendJsonSuccess(res, category, SUCCESS.CREATED)

};

//update a category by id
const updateCategoryById = (req: Request, res: Response) => {
    //lấy id cần update
    const { id } = req.params;
    // Lấy dữ liệu từ body của request
    const payload = req.body;
    console.log('<<=== 🚀 payload ===>>',payload);
    const categoryUpdated = categoriesService.updateById(parseInt(id as string), payload);
    
   sendJsonSuccess(res, categoryUpdated)
};

//delete a category by id
const deleteCategoryById = (req: Request, res: Response) => {
    const { id } = req.params;

    const category = categoriesService.deleteById(parseInt(id as string));
    
    sendJsonSuccess(res, category)
};

export default {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById
}