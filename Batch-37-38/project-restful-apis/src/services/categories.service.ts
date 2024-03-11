import fs from 'node:fs'
import createError from 'http-errors';
const fileName = './src/data/categories.json';
//Doc noi dung cua file, co chua tieng viet
const data = fs.readFileSync(fileName, { encoding: 'utf-8', flag: 'r' });

type ICategory = {id?: number, name: string, description: string}
let categories: ICategory[] = JSON.parse(data);

//Tra lai ket qua
const getAllProduct = ()=>{
    console.log('service',categories);
    return categories
}

const getCategoryById  = (id:number)=>{

    const data = categories.find(c => c.id === id)

    if(!data){
        throw createError(404,'Category not found')
    }
    return data;
}

const createCategory = (data: ICategory)=>{
    const newCategories = [...categories,data]

    //ghi file
    fs.writeFile(fileName, JSON.stringify(newCategories), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    return data;
}

const updateCategory = (id: number,data: ICategory)=>{
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