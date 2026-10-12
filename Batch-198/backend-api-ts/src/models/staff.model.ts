import mongoose from "mongoose";

//create staffSchema
const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
    },
    avatar: {
        type: String,
        required: false,
        maxLength: 255,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        maxLength: 255,
    },
    password: {
        type: String,
        required: true,
    },
    // khóa hay mở một user
    isActive: {
        type: Boolean,
        default: true,
    },
    //vai trò, dùng để phân quyền, admin có thể quản lý tất cả, staff chỉ có thể quản lý sản phẩm
    role: {
        type: String,
        enum: ["admin", "staff"],
        default: "staff"
    }
},
{
    timestamps: true, // tự động tạo createdAt và updatedAt
    collection: "staffs", // tên collection trong DB
});

//create staff model
const Staff = mongoose.model("Staff", staffSchema);
export default Staff;