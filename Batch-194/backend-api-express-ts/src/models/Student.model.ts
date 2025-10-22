import { Schema, model } from 'mongoose';

//Định nghĩa cấu trúc của một collection

const studentSchema = new Schema({
    fullName: {
        type: String, //kiểu dữ liệu
        required: true, //bắt buộc phải có
    },
    code: {
        type: String,
        required: true,
        unique: true, //không được trùng lặp
    },
    age: {
        type: Number,
        required: true,
    },
    //Giống như là khoá ngoại
    //đang tham chiếu tới table gốc Class
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
    },
}, {
    timestamps: true, //tự động thêm 2 trường createdAt và updatedAt
    versionKey: false, //loại bỏ trường __v
    collection: 'students', //tên collection trong database
    autoIndex: true, //tự động tạo index
});
//Tạo model từ schema
const Student = model('Student', studentSchema);
export default Student;

// const products = [
//     {id: 1, name: 'product a',comments: [
//         {id: 1, content: 'Bình luận 1 cho sản phẩm 1'},
//         {id: 2, content: 'Bình luận 2 cho sản phẩm 1'},
//     ]},
//     {id: 2, name: 'product b', comments: [
//         {id: 1, content: 'Bình luận 1 cho sản phẩm 2'},
//     ]},
//     {id: 3, name: 'product c', comments: [
//         {id: 1, content: 'Bình luận 1 cho sản phẩm 3'},
//     ]},
// ]

// const comments = [
//     {id: 1, productId: 1, content: 'Bình luận 1 cho sản phẩm 1'},
//     {id: 2, productId: 1, content: 'Bình luận 2 cho sản phẩm 1'},
//     {id: 3, productId: 2, content: 'Bình luận 1 cho sản phẩm 2'},
// ]