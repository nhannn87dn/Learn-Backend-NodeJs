import mongoose from "mongoose";

//create student schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String, // kieu du lieu
        required: true, // yeu cau phai dien gia tri
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // email phai duy nhat
    },
}, {
    timestamps: true, // tu dong tao createdAt va updatedAt
    collection: "students", // ten collection trong DB
    versionKey: false, // khong tao field __v
});

//create student model
const Student = mongoose.model("Student", studentSchema);
export default Student;