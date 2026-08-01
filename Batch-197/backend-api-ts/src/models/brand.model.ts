import mongoose from "mongoose";

//create category schema
const brandSchema = new mongoose.Schema({
    brand_name: {
        type: String,
        required: true,
        unique: true,
        trim: true, // loại bỏ khoảng trắng ở đầu và cuối chuỗi
        minLength: [2, 'Tên thương hiệu tối thiểu 2 ký tự'],
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
},{
    timestamps: true, // Tự động thêm createdAt và updatedAt
    collection: "brands", // Tên collection trong MongoDB, nếu ko thì nó sẽ lấy tên tự động là category theo tên model
});

//create category model
const Brand = mongoose.model("Brand", brandSchema);
export default Brand;


