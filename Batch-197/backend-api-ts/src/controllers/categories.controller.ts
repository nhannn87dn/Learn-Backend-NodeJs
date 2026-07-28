import { type Request, type Response } from 'express';

import fs from 'node:fs';
import { TCategory } from '../types/category';
import { readFile, writeFile } from '../helpers/file.helper';
const fileName = 'src/database/data.json';

//Get All Categories
const getAllCategories = (req: Request, res: Response) => {

    // Lấy dữ liệu từ file data.json
    // const data = fs.readFileSync(fileName, { encoding: 'utf-8', flag: 'r' });
    // const categories: TCategory[] = JSON.parse(data);
    const categories: TCategory[] = readFile(fileName);
    console.log('<<=== 🚀 categories ===>>',categories);

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

    if (!id) {
        throw new Error('Category id is required');
    }
    
    // Lấy dữ liệu từ file data.json
   const categories: TCategory[] = readFile(fileName);

    console.log('<<=== 🚀 categories ===>>',categories);

    // Tìm category theo id
    const category = categories.find((c)=> c.id === parseInt(id as string));

    console.log('<<=== 🚀 category ===>>',category);
    if (!category) {
        throw new Error(`Category with id ${id} not found`);
    }

    res
    .status(200)
    .json({ 
        statusCode: 200,
        message: 'Get category by id',
        data: category
    });
};

//create a new category
const createCategory = (req: Request, res: Response) => {
    // Lấy dữ liệu từ body của request
    const payload = req.body;
    console.log('<<=== 🚀 payload ===>>',payload);

    // Lấy dữ liệu từ file data.json
    const categories: TCategory[] = readFile(fileName);

    //thêm category mới vào mảng categories
    categories.push({
        id: categories.length + 1, //tự động tăng id
        name: payload.name,
        description: payload.description
    });

    // Ghi dữ liệu mới vào file data.json
    //fs.writeFileSync(fileName, JSON.stringify(categories, null, 2), { encoding: 'utf-8' });
    writeFile(fileName, categories);

    //response lại cho client

    res
    .status(201)
    .json({ 
        statusCode: 201,
        message: 'create a new category',
        data: payload //response lại cho client category vừa được tạo
    });
};

//update a category by id
const updateCategoryById = (req: Request, res: Response) => {
    //lấy id cần update
    const { id } = req.params;
    // Lấy dữ liệu từ body của request
    const payload = req.body;
    console.log('<<=== 🚀 payload ===>>',payload);

    // Lấy dữ liệu từ file data.json
    const categories: TCategory[] = readFile(fileName);

    console.log('<<=== 🚀 categories ===>>',categories);

    //tìm category cần update voi Id
    let category = categories.find((c)=> c.id === parseInt(id as string));
    if (!category) {
        throw new Error(`Category with id ${id} not found`);
    }

    //cập nhật category và lưu lại
   // 3. Cập nhật mảng categories
    const updatedCategories = categories.map((c) => {
        if (c.id === parseInt(id as string)) {
            return {
                ...c,
                name: payload.name || c.name,
                description: payload.description || c.description,
            };
        }
        return c;
    });

    // Ghi dữ liệu mới vào file data.json
    writeFile(fileName, updatedCategories);

    //response lại cho client category vừa được update
    const categoryUpdated = updatedCategories.find((c)=> c.id === parseInt(id as string));

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

    // Lấy dữ liệu từ file data.json
    const categories: TCategory[] = readFile(fileName);

    //tìm category cần delete voi Id
    const category = categories.find((c)=> c.id === parseInt(id as string));
    if (!category) {
        throw new Error(`Category with id ${id} not found`);
    }

    // 3. Xóa category khỏi mảng categories
    const updatedCategories = categories.filter((c) => c.id !== parseInt(id as string));    

    // Ghi dữ liệu mới vào file data.json
    writeFile(fileName, updatedCategories);

    res
    .status(200)
    .json({ 
        statusCode: 200,
        message: 'delete a category by id',
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