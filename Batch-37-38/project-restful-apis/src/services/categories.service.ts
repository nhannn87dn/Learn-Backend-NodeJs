import createError from 'http-errors';
import Category from '../models/category.model';
import { ICategory } from '../types/models';
//Tra lai ket qua
const getAllProduct = ()=>{
    console.log('service',categories);
    return categories
}

const getCategoryById  = async (id:string)=>{
    //SELECT * FROM categories WHERE _id = id
    const result = await Category.findById(id);

    if(!result){
        throw createError(404,'Category not found');
    }
    return result;
}

const createCategory = async (data: ICategory)=>{
    const result = await Category.create(data)
    return result;
}

const updateCategory = async (id: string,data: ICategory)=>{
    //check xem id co ton tai khong
    const category = categories.find(c=>c.id === id)
    if(!category){
        throw createError(404,'Category not found')
    }

    //Tim item co id va thay doi cac gia tri
    categories.map((c)=>{
       if(c.id ===  id){
            c.name = data.name;
            c.description = data.description
       }
    })

    //ghi file

    fs.writeFile(fileName, JSON.stringify(categories), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    return data
}

const deleteCategory = (id:number)=>{
   
    //check xem id co ton tai khong
    const category = categories.find(c=>c.id === id)
    if(!category){
        throw createError(404,'Category not found')
    }
    console.log(id,categories);
    
    //Loc ra nhung item khong phai la item co ID dang xoa
    const newCategories =  categories.filter(c=>c.id !== category?.id)
    //Ghi file
    fs.writeFile(fileName, JSON.stringify(newCategories), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });


    return category
}

export default {
    getAllProduct,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}