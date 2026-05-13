import { Schema, model } from 'mongoose';

// Định nghĩa schema cho Student
const studentSchema = new Schema({
    name: { 
        type: String, 
        required: true,
        trim: true,// loại bỏ khoảng trắng ở đầu và cuối chuỗi
        minLength: 2, //nó tạo một message lỗi bằng tiếng anh.
        maxLength: [60, 'Tên tối đã 60 ký tự'] //nó tạo một message lỗi bằng tiếng việt.
     },
    age: { 
        type: Number, 
        required: true,
        min: [18, 'Tuổi phải lớn hơn hoặc bằng 18'], //nó tạo một message lỗi bằng tiếng việt.
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true, // tự động chuyển email thành chữ thường
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class', // tham chiếu đến model Class
    }
}, {
    timestamps: true, // tự động thêm createdAt và updatedAt
    collection: 'students', // đặt tên collection trong MongoDB
    versionKey: false, // tắt trường __v do Mongoose tự tạo ra để đánh dấu phiên bản của document
});

const Student = model('Student', studentSchema);
export default Student;

// {
//     "_id": "64a9c8e5f1d2c8b9a0e4b5c6",
//     "name": "John Doe",
//     "email": "johndoe@example.com",
//     "class": "64a9c8e5f1d2c8b9a0e4b5c6"
// }


// 1 product - N comments
// {
//     "_id": "64a9c8e5f1d2c8b9a0e4b5c6",
//     "name": "Iphone 14 Pro Max",
//     "comments": [
//         {
//             "_id": "64a9c8e5f1d2c8b9a0e4b5c6",
//             "content": "Sản phẩm rất tốt",
//             "author": "John Doe"
//         },
//         {
//             "_id": "64a9c8e5f1d2c8b9a0e4b5c6",
//             "content": "Sản phẩm rất đẹp",
//             "author": "Jane Smith"
//         }
//     ]
// }