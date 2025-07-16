import { Schema, model } from 'mongoose';

// b1: Khai báo schema cho Category
const categortySchema = new Schema({
    // Khai báo các trường dữ liệu của mô hình Category
    category_name: {
        type: String,
        required: true,
        unique: true, // Đảm bảo tên danh mục là duy nhất
        trim: true, // Loại bỏ khoảng trắng thừa
        minLength: 3, // Đặt độ dài tối thiểu cho tên danh mục
        maxLength: 50 // Đặt độ dài tối đa cho tên danh mục
    },
    description: {
        type: String,
        required: false,
        maxLength: 500 // Đặt độ dài tối đa cho mô tả
    },
    //dien-thoai (Hợp lệ) , Dien-Thoai (Không hợp lệ)
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Loại bỏ khoảng trắng thừa
        lowercase: true, // Chuyển đổi slug thành chữ thường
        minLength: 3, // Đặt độ dài tối thiểu cho slug
        maxLength: 255 // Đặt độ dài tối đa cho slug
    }
}, {
    timestamps: true, // Tự động thêm trường createdAt và updatedAt
    versionKey: false, // Tắt trường __v
    //collection: 'categories' // Tên collection trong MongoDB
});

// b2: Tạo mô hình Category từ schema
const Category = model('Category', categortySchema);  
// b3: Xuất mô hình Category để sử dụng ở nơi khác
export default Category;