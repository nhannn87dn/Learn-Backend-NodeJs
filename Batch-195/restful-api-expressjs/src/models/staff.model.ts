import { Model, Schema, model } from "mongoose";
import argon2 from "argon2";

const staffSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 160,
        lowercase: true,
        validate: {
            validator: function (v: string) {
                //Nếu email đã được sửa đổi hoặc là mới, thì thực hiện kiểm tra định dạng
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    active: {
        type: Boolean,
        default: true,
        required: true,
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
    },
    //sử dụng để phân quyền
    role: {
        type: String,
        required: true,
        enum: ['admin', 'manager', 'staff'],
        default: 'staff',
    },
    //Phân quyền nâng cao hơn với permissions
    //format: ['read:staff', 'create:staff', 'update:staff', 'delete:staff']
    // permissions: {
    //     type: [String],
    //     default: [],
    // }
}, {
    timestamps: true,

});

//tạo một middleware để hash password trước khi lưu vào database
staffSchema.pre('save', async function () {
    const staff = this as any; // ép kiểu để có thể truy cập vào trường password
    if (staff.isModified('password')) {
        //using argon2
        staff.password = await argon2.hash(staff.password);
    }

   
});

const Staff = model("Staff", staffSchema);

export default Staff;