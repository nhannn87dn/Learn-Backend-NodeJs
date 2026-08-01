import mongoose, { Schema, Document } from 'mongoose';


// Define the Comment interface
const productSchema = new Schema({
     product_name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [3, 'Tên sản phẩm ít nhất 3 ký tự'],
        maxLength: [255, 'Tên sản phẩm tối đa 255 ký tự']
    },
    price: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Giá sản phẩm không được nhỏ hơn 0']
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Giảm giá không được nhỏ hơn 0'],
        max: [70, 'Giảm giá không được vượt quá 70%']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category', // Tham chiếu đến model Category
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand', // Tham chiếu đến model Brand
        required: true
    },
    description: {
        type: String,
        default: null
    },
    model_year: {
        type: Number,
        default: null
    },
    slug: {
        type: String,
        unique: true,
        minLength: [3, 'Slug ít nhất 3 ký tự'],
        maxLength: [255, 'Slug tối đa 255 ký tự'],
        default: null
    },
    thumbnail: {
        type: String,
        maxLength: [255, 'Thumbnail tối đa 255 ký tự'],
        default: null
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'Số lượng tồn kho không được nhỏ hơn 0']
    },

},{
    timestamps: true, // Tự động thêm createdAt và updatedAt
    collection: "products", // Tên collection trong MongoDB, nếu ko thì nó sẽ lấy tên tự động là product theo tên model
})

const Product = mongoose.model("Product", productSchema);
export default Product;