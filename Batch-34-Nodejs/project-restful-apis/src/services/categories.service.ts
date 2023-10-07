import createError from 'http-errors';
import categories from '../constants/categories.json';
import fs from 'fs';

/**
 * Service == Dịch vụ
 * - Đi xử lí logic
 * - Tương tác trực tiếp với Database
 */

//khi fs chạy, là nó lấy thư mục root của dự án làm gốc
const fileName = './src/constants/categories.json';

interface ICategory {
  id: number;
  name: string;
  description: string;
}
/**
 * Các hàm trong serice phải có return
 */


const getAll = async () => {
  return categories;
};

const getItemById = async (id: number) => {
  const user = categories.find((user) => user.id === id);
  return user;
};

const createItem = async (payload: ICategory) => {
 
    //thêm phần tử mới vào categories[]
    //const newcategories = [...categories, {id: 4, name: 'Tom', email: 'tom@gmail.com'}];
    const newcategories = [...categories, payload];
    //ghi nội dung xuống một file
    fs.writeFileSync(fileName, JSON.stringify(newcategories), { flag: 'w' });
    //trả lại thông tin cho clien
    return newcategories;
  
};

const updateItem = async (id: number, payload: ICategory)  => {
 
    //Bước 1: Tìm xem  có tồn tại user có id không
    const user = categories.find((user) => user.id === id);

    //Nếu không tồn tại thì báo lỗi
    if (!user) {
      throw createError('404', 'User not found');
    }

    //Bước 2: Cập nhật lại thông tin của user có id
    const newcategories = categories.map((user) => {
      if (user.id === id) {
        const updateUser = { ...user, ...payload };
        return updateUser;
      }
      return user;
    });

    //ghi nội dung xuống một file
    fs.writeFileSync(fileName, JSON.stringify(newcategories), { flag: 'w' });

    return newcategories;
};

const deleteItem = async (id: number): Promise<ICategory[]> => {
 
 
    //Bước 1: Tìm xem  có tồn tại user có id không
    const user = categories.find((user) => user.id === id);

    //Nếu không tồn tại thì báo lỗi
    if (!user) {
      throw createError(404, 'User not found');
    }

    //Bước 2: Nếu tìm thấy thì mới đi xóa
    const newcategories = categories.filter((user) => user.id !== id);

    //ghi nội dung xuống một file
    fs.writeFileSync(fileName, JSON.stringify(newcategories), { flag: 'w' });

    return newcategories;
};

export default {
  getAll,
  getItemById,
  updateItem,
  createItem,
  deleteItem,
};
