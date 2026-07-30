import mongoose, { Schema, Document } from 'mongoose';

// Define the comment interface
const commentSchema = new Schema({
    content: {
        type: String, // Kiểu dữ liệu
        required: true, // yêu cầu điền
    },
})


// Define the Comment interface
const productSchema = new Schema({
    product_name: {
        type: String, // Kiểu dữ liệu
        required: true, // yêu cầu điền
        minLength: 3, // Độ dài tối thiểu
        maxLength: 100, // Độ dài tối đa
        unique: true, // Giá trị phải duy nhất
    },
    price: {
        type: Number, // Kiểu dữ liệu
        required: true, // yêu cầu điền
        min: 0, // Giá trị tối thiểu
        default: 0, // Giá trị mặc định
    },
    //quan hệ theo kiểu reference với category
    category: {
        type: mongoose.Schema.Types.ObjectId, // Kiểu dữ liệu   
        ref: 'Category', // Tham chiếu đến model Category
        required: true, // yêu cầu điền
    },
    // embedded document comments
    comments: [commentSchema], // Mảng các comment

},{
    timestamps: true, // Tự động thêm createdAt và updatedAt
    collection: "products", // Tên collection trong MongoDB, nếu ko thì nó sẽ lấy tên tự động là product theo tên model
})

const Product = mongoose.model("Product", productSchema);
export default Product;