import { Schema, model } from 'mongoose';

//tạo schema cho class
const classSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
});

//tạo model cho class
const Class = model('Class', classSchema);
export default Class;


// {
//     "_id": "64a9c8e5f1d2c8b9a0e4b5c6",
//     "name": "Lớp 10A1",
//     "description": "Lớp 10A1 chuyên Toán"
// }