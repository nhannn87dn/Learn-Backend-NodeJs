import createError from 'http-errors';
import { categories } from './../../../../Batch-37-38/project-restful-apis/src/seeds/category';
// Kết nối trực tiếp với Database
import fs from "node:fs"
const fileName = './src/databases/categories.json'

type TCategory = {
  id?: number;
  name: string;
  desc?: string;
}

// Lấy tất cả record
const findAll = ()=>{
  const data = fs.readFileSync(fileName, { encoding: 'utf-8', flag: 'r' });
  console.log('<<=== 🚀 data ===>>',data);
    //convert qua Object
  const categories: TCategory[] = JSON.parse(data)
  return categories
}

// Tìm 1 record theo ID
const findById = (id:number)=>{
    const categories = findAll()
    //Đi tìm 1 cái khớp id
    const category = categories.find(c=> c.id === id)
    
     /* Bắt lỗi khi ko tìm thấy thông tin */
    if(!category){
      throw createError(400, 'Category Not Found')
    }

    return category
}

const createRecord = (payload: TCategory)=>{
  //Đọc data cũ
  const categories = findAll();
  //Thêm phần tử mới vào mảng trên
  const newCategories  = [...categories,payload]
  //Ghi file
  //ghi file
  fs.writeFile(fileName, JSON.stringify(newCategories), function (err) {
      if (err) throw createError(500, 'writeFile error')
      console.log('writeFile success!');
  });

    //trả lại cho client record vừa thêm mới
  console.log('<<=== 🚀 payload service ===>>', payload);
  return payload
}

const updateById = (id: number, payload: TCategory)=>{
   //Đọc data cũ
   const categories = findAll();
    //b1.Kiểm tra sự tồn tại của danh mục có id này
    const category = categories.find(c => c.id === parseInt(id))
    console.log('<<=== 🚀 category ===>>',category);

    /* Bắt lỗi khi ko tìm thấy thông tin */
    if(!category){
      throw createError(400, 'Category Not Found')
    }

    //b2: Update
    const updated_cate = categories.map((c)=> {
      if (c.id === id){
          c.name = payload.name
      }
      return c
    })

    //ghi file
    fs.writeFile(fileName, JSON.stringify(updated_cate), function (err) {
        if (err) throw createError(500, 'writeFile error')
        console.log('writeFile success!');
    });

    //Return về record vừa đc update
    return updated_cate
}

const deleteById = (id: number)=>{
  //Đọc data cũ
  const categories = findAll();
  //b1 Kiểm tra xem tồn tại category có id
  const category = categories.find(c => c.id === id)

  if(!category){
    throw createError(400, "Category Not Found")
  }

  //b2 Nếu tồn tại thì xóa
  const new_category = categories.filter(c=> c.id !== id)

  console.log('<<=== 🚀 new_category ===>>',new_category);

  //ghi lại file
  //ghi file
  fs.writeFile(fileName, JSON.stringify(new_category), function (err) {
      if (err) throw createError(500, 'writeFile error')
      console.log('writeFile success!');
  });

  //Return về record vừa xóa
  return new_category
}


export default {
  findAll,
  findById,
  createRecord,
  updateById,
  deleteById
}