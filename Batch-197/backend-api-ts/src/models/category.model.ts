import mongoose from "mongoose";

//create category schema
const categorySchema = new mongoose.Schema({
    category_name: {
        type: String, // Kiểu dữ liệu
        required: true, // yêu cầu điền
        maxLength: 50, // Độ dài tối đa
        unique: true, // Giá trị phải duy nhất
    },
    description: {
        type: String, // Kiểu dữ liệu
        required: false, // yêu cầu điền
        maxLength: 255, // Độ dài tối đa
    },
    slug: {
        type: String, // Kiểu dữ liệu
        required: true, // yêu cầu điền
        maxLength: 255, // Độ dài tối đa
        unique: true, // Giá trị phải duy nhất
    },
},{
    timestamps: true, // Tự động thêm createdAt và updatedAt
    collection: "categories", // Tên collection trong MongoDB, nếu ko thì nó sẽ lấy tên tự động là category theo tên model
});

//create category model
const Category = mongoose.model("Category", categorySchema);
export default Category;


