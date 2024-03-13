import fs from 'node:fs'
import createError from 'http-errors';
const fileName = './src/data/brands.json';
//Doc noi dung cua file, co chua tieng viet

type IBrand = {id?: number, name: string, description: string}


//Tra lai ket qua
const getAll = ()=>{
    const data = fs.readFileSync(fileName, { encoding: 'utf-8', flag: 'r' });
    //Trả về mảng rỗng nếu không thấy nội dung
    if(!data) {
        return []
    }
    const brands: IBrand[] = JSON.parse(data);
    console.log('service',brands);
    return brands
}

const getBrandById  = (id:number)=>{
    const brands = getAll();
    const data = brands.find(c => c.id === id)

    if(!data){
        throw createError(404,'Brand not found')
    }
    return data;
}

const createBrand = (data: IBrand)=>{
    const brands = getAll();
    const newBrands = [...brands,data]

    //ghi file
    fs.writeFile(fileName, JSON.stringify(newBrands), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    return data;
}

const updateBrand = (id: number,data: IBrand)=>{
    const brands = getAll();
    //check xem id co ton tai khong
    const category = brands.find(c=>c.id === id)
    if(!category){
        throw createError(404,'Brand not found')
    }

    //Tim item co id va thay doi cac gia tri
    brands.map((c)=>{
       if(c.id ===  id){
            c.name = data.name;
            c.description = data.description
       }
    })

    //ghi file

    fs.writeFile(fileName, JSON.stringify(brands), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    return data
}

const deleteBrand = (id:number)=>{
    const brands = getAll();
    //check xem id co ton tai khong
    const category = brands.find(c=>c.id === id)
    if(!category){
        throw createError(404,'Brand not found')
    }
    console.log(id,brands);
    
    //Loc ra nhung item khong phai la item co ID dang xoa
    const newBrands =  brands.filter(c=>c.id !== category?.id)
    //Ghi file
    fs.writeFile(fileName, JSON.stringify(newBrands), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });


    return category
}

export default {
    getAll,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
}