import { model, Schema } from 'mongoose';

//Định nghĩa schema
const brandSchema = new Schema({
    brand_name: {
        type: String,
        required: true,
        unique: true, //Không được trùng lặp
        maxLength: 50, //Độ dài tối đa 50 ký tự
    },
    description: {
        type: String,
        required: false, //Không bắt buộc
        maxLength: 500, //Độ dài tối đa 50 ký tự
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        maxLength: 165,
    }
},{})

//Tạo model
const Brand = model('Brand', brandSchema);
export default Brand;