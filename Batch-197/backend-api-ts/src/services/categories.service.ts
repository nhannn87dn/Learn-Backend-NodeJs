import { readFile, writeFile } from '../helpers/file.helper';
import { TCategory } from '../types/category';
import Category from '../models/category.model';

const fileName = 'src/database/category.json';


//Get All Categories
const findAll = async()=>{
     // Lấy dữ liệu từ file data.json
    // const data = fs.readFileSync(fileName, { encoding: 'utf-8', flag: 'r' });
    // const categories: TCategory[] = JSON.parse(data);
    //const categories: TCategory[] = readFile(fileName);
    //console.log('<<=== 🚀 categories ===>>',categories);

    const categories = await Category.find();

    return categories;
}
//Get Category by ID'

const findById = (id: number)=>{
     // Lấy dữ liệu từ file data.json
   const categories: TCategory[] = readFile(fileName);

    console.log('<<=== 🚀 categories ===>>',categories);

    // Tìm category theo id
    const category = categories.find((c)=> c.id === id);

    console.log('<<=== 🚀 category ===>>',category);
    if (!category) {
        throw new Error(`Category with id ${id} not found`);
    }

    return category;
}

//create a new category
const create = async(payload: TCategory)=>{
    // Lấy dữ liệu từ file data.json
    //const categories: TCategory[] = readFile(fileName);

    //thêm category mới vào mảng categories
    // const newCategory: TCategory = {
    //     id: categories.length + 1, //tự động tăng id
    //     name: payload.name,
    //     description: payload.description
    // };
    // categories.push(newCategory);
    

    // Ghi dữ liệu mới vào file data.json
    //fs.writeFileSync(fileName, JSON.stringify(categories, null, 2), { encoding: 'utf-8' });
    //writeFile(fileName, categories);

    //create a new category in database
    const newCategory = new Category({
        category_name: payload.category_name,
        description: payload.description,
    });
    const result = await newCategory.save();
    console.log("New category created:", result);

    return result
}

//update a category by id

const updateById = (id: number, payload: TCategory)=>{
    // Lấy dữ liệu từ file data.json
        const categories: TCategory[] = readFile(fileName);
    
        console.log('<<=== 🚀 categories ===>>',categories);
    
        //tìm category cần update voi Id
        let category = categories.find((c)=> c.id === id);
        if (!category) {
            throw new Error(`Category with id ${id} not found`);
        }
    
        //cập nhật category và lưu lại
       // 3. Cập nhật mảng categories
        const updatedCategories = categories.map((c) => {
            if (c.id === id) {
                return {
                    ...c,
                    name: payload.category_name || c.category_name,
                    description: payload.description || c.description,
                };
            }
            return c;
        });
    
        // Ghi dữ liệu mới vào file data.json
        writeFile(fileName, updatedCategories);
    
        //response lại cho client category vừa được update
        const categoryUpdated = updatedCategories.find((c)=> c.id === id);
    return categoryUpdated
}

//delete a category by id
const deleteById = (id: number)=>{
    // Lấy dữ liệu từ file data.json
    const categories: TCategory[] = readFile(fileName);

    //tìm category cần delete voi Id
    const category = categories.find((c)=> c.id === id);
    if (!category) {
        throw new Error(`Category with id ${id} not found`);
    }

    // 3. Xóa category khỏi mảng categories
    const updatedCategories = categories.filter((c) => c.id !== id);    

    // Ghi dữ liệu mới vào file data.json
    writeFile(fileName, updatedCategories);
    return category 
}


export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}