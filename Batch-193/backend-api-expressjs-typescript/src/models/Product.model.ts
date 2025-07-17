import { Schema, model } from 'mongoose';
// b1: Khai báo schema cho Product
const productSchema = new Schema({
    // Khai báo các trường dữ liệu của mô hình Product
    product_name: {
        type: String,
        required: true,
        unique: true, // Đảm bảo tên sản phẩm là duy nhất
        trim: true, // Loại bỏ khoảng trắng thừa
        minLength: 3, // Đặt độ dài tối thiểu cho tên sản phẩm
        maxLength: 255 // Đặt độ dài tối đa cho tên sản phẩm
    },
    description: {
        type: String,
        required: false,
        maxLength: 500 // Đặt độ dài tối đa cho mô tả
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Giá không được âm
        default: 0 // Giá mặc định là 0
    },
    discount: { 
        type: Number,
        required: true,
        min: 0, // Giảm giá không được âm
        max: 70, // Giảm giá tối đa là 70%
        default: 0 // Giảm giá mặc định là 0%
    },
    stock: {
        type: Number,
        required: true,
        min: 0, // Số lượng không được âm
        default: 0 // Số lượng mặc định là 0
    },
    model_year: {
        type: Number,
        required: true,
        min: 1900, // Năm không được nhỏ hơn 1900
        max: new Date().getFullYear() // Năm không được lớn hơn năm hiện tại
    },
    //Thiết lập quan hệ với Category
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category', // Liên kết với mô hình Category
        required: true // Bắt buộc phải có category_id
    },
    brand_id: {
        type: Schema.Types.ObjectId,
        ref: 'Brand', // Liên kết với mô hình Brand
        required: true // Bắt buộc phải có brand_id
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Loại bỏ khoảng trắng thừa
        lowercase: true, // Chuyển đổi slug thành chữ thường
        minLength: 3, // Đặt độ dài tối thiểu cho slug
        maxLength: 255 // Đặt độ dài tối đa cho slug
    },
    thumbnail: {
        type: String,
        required: false,
        trim: true, // Loại bỏ khoảng trắng thừa
        maxLength: 255 // Đặt độ dài tối đa cho thumbnail
    }
}, {
    timestamps: true, // Tự động thêm trường createdAt và updatedAt
    versionKey: false, // Tắt trường __v
});

// b2: Tạo mô hình Product từ schema
const Product = model('Product', productSchema);    
// b3: Xuất mô hình Product để sử dụng ở nơi khác
export default Product;