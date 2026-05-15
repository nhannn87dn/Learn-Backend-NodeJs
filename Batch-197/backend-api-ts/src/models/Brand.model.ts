import { Schema, model } from 'mongoose';

// Định nghĩa schema cho Brand
const brandSchema = new Schema({
    brand_name: {
        type: String,
        required: true,
        unique: true,
        trim: true, // loại bỏ khoảng trắng ở đầu và cuối chuỗi
        maxLength: [100, 'Tên thương hiệu tối đa 100 ký tự']
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
        maxLength: [100, 'Slug tối đa 100 ký tự']
    }
}, {
    timestamps: true, // tự động thêm createdAt và updatedAt
    collection: 'brands', // đặt tên collection trong MongoDB
    versionKey: false, // tắt trường __v do Mongoose tự tạo ra để đánh dấu phiên bản của document
});

const Brand = model('Brand', brandSchema);
export default Brand;
