import fs from 'node:fs'
import createError from 'http-errors';
const fileName = './src/data/categories.json';


type ICategory = {id?: number, name: string, description: string}


//Tra lai ket qua
const getAllProduct = ()=>{
    //doc file lay noi dung json
    //Doc noi dung cua file, co chua tieng viet
    const data = fs.readFileSync(fileName, { encoding: 'utf-8', flag: 'r' });
    //const data = fs.readFile(fileName, 'utf-8');
    const categories: ICategory[] = JSON.parse(data);

    return categories
}

const getCategoryById  = (id:number)=>{
    //doc file lay noi dung json
    const data = fs.readFileSync(fileName, { encoding: 'utf-8', flag: 'r' });
    const categories: ICategory[] = JSON.parse(data);
    //lay thong tin
    const category = categories.find(c => c.id === id)

    if(!category){
        throw createError(404,'Category not found')
    }
    return category;
}

const createCategory = (payload: ICategory)=>{
    //doc file lay noi dung json
    const data = fs.readFileSync(fileName, { encoding: 'utf-8', flag: 'r' });
    const categories: ICategory[] = JSON.parse(data);
    //Bo sung phan tu moi vao mang cu
    const newCategories = [...categories,payload]

    //ghi file
    fs.writeFile(fileName, JSON.stringify(newCategories), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    return payload;
}

const updateCategory = (id: number,payload: ICategory)=>{
    //doc file lay noi dung json
    const data = fs.readFileSync(fileName, { encoding: 'utf-8', flag: 'r' });
    const categories: ICategory[] = JSON.parse(data);
    //check xem id co ton tai khong
    const category = categories.find(c=>c.id === id)
    if(!category){
        throw createError(404,'Category not found')
    }

    //Tim item co id va thay doi cac gia tri
    categories.map((c)=>{
       if(c.id ===  id){
            c.name = payload.name;
            c.description = payload.description
       }
    })

    //ghi file

    fs.writeFile(fileName, JSON.stringify(categories), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    return payload
}

const deleteCategory = (id:number)=>{
    //doc file lay noi dung json
    const data = fs.readFileSync(fileName, { encoding: 'utf-8', flag: 'r' });
    const categories: ICategory[] = JSON.parse(data);
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