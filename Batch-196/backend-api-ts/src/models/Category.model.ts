import { Schema, model } from 'mongoose';

// Định nghĩa schema cho Category
const categorySchema = new Schema({
    category_name: {
        type: String,
        required: true,
        unique: true,
        trim: true, // loại bỏ khoảng trắng ở đầu và cuối chuỗi
        maxLength: [50, 'Tên danh mục tối đa 50 ký tự']
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'Mô tả tối đa 500 ký tự'],
        default: null
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: [50, 'Slug tối đa 50 ký tự']
    }
}, {
    timestamps: true, // tự động thêm createdAt và updatedAt
    collection: 'categories', // đặt tên collection trong MongoDB
    versionKey: false, // tắt trường __v do Mongoose tự tạo ra để đánh dấu phiên bản của document
});

const Category = model('Category', categorySchema);
export default Category;
