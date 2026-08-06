import mongoose from "mongoose";

//create category schema
const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true, // loại bỏ khoảng trắng ở đầu và cuối chuỗi
        minLength: [2, 'Tên tối thiểu 2 ký tự'],
        maxLength: [100, 'Tên tối đa 100 ký tự']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true, // loại bỏ khoảng trắng ở đầu và cuối chuỗi
        //minLength: [5, 'Email tối thiểu 5 ký tự'],
        validate: {
            validator: function (value: string) {
                // Sử dụng regex để kiểm tra định dạng email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: (props: any) => `${props.value} không phải là một địa chỉ email hợp lệ!`
        },

    },
    password: {
        type: String,
        required: true,
        trim: true, // loại bỏ khoảng trắng ở đầu và cuối chuỗi
        minLength: [6, 'Mật khẩu tối thiểu 6 ký tự'],
    },
    role: {
        type: String,
        default: 'staff',
        enum: ['staff', 'admin'], // Chỉ cho phép các giá trị trong mảng này
    }
    
},{
    timestamps: true, // Tự động thêm createdAt và updatedAt
    collection: "staffs", // Tên collection trong MongoDB, nếu ko thì nó sẽ lấy tên tự động là category theo tên model
});

//create category model
const Staff = mongoose.model("Staff", staffSchema);
export default Staff;


