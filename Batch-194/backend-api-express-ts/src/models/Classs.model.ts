import { Schema, model } from 'mongoose';

//Định nghĩa cấu trúc của một collection

const classSchema = new Schema({
    name: {
        type: String, //kiểu dữ liệu
        required: true, //bắt buộc phải có
    },
}, {

});
//Tạo model từ schema
const Class = model('Class', classSchema);
export default Class;