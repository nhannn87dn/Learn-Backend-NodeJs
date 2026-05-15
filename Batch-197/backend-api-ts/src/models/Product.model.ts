import { Schema, model } from 'mongoose';

// Định nghĩa schema cho Product
const productSchema = new Schema({
    product_name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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
    }
}, {
    timestamps: true, // tự động thêm createdAt và updatedAt
    collection: 'products', // đặt tên collection trong MongoDB
    versionKey: false, // tắt trường __v
});

const Product = model('Product', productSchema);
export default Product;
