import mongoose, { Schema, Document } from "mongoose";

//create product schema
const productSchema = new mongoose.Schema({
    product_name: {
        type: String, // kieu du lieu
        required: true, // yeu cau phai dien gia tri
        maxLength: 255, // gioi han do dai
        trim: true, // cat bo khoang trang dau va cuoi chuoi
        unique: true, // product_name phai duy nhat
    },
    description: {
        type: String,
        required: true,
        maxLength: 500, // gioi han do dai
    },
    price: {
        type: Number,
        required: false,
        min: 0, // gia tri nho nhat la 0
        default: 0, // gia tri mac dinh la 0
    },
    discount: {
        type: Number,
        required: false,
        min: 0, // gia tri nho nhat la 0
        max: 70, // gia tri lon nhat la 70
        default: 0, // gia tri mac dinh la 0
    },
    model_year: {
        type: Number,
        required: false,
        min: 1900, // gia tri nho nhat la 1900
    },
    stock: {
        type: Number,
        required: false,
        min: 0, // gia tri nho nhat la 0
        default: 0, // gia tri mac dinh la 0
    },
    thumbnail: {
        type: String,
        required: false,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true, // slug phai duy nhat
        trim: true, // cat bo khoang trang dau va cuoi chuoi
        maxLength: 255, // gioi han do dai
    },
    // Quan hệ với brand
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand", // tham chiếu đến model Brand
    },
    // Quan hệ với category
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category", // tham chiếu đến model Category
    },

}, {
    timestamps: true, // tu dong tao createdAt va updatedAt
    collection: "products", // ten collection trong DB
    versionKey: false, // khong tao field __v
})

//create product model
const Product = mongoose.model("Product", productSchema);
export default Product;