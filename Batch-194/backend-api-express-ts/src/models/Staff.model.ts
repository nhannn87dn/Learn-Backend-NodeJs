import { Model, Schema, model } from "mongoose";
import { IStaff, StaffMethods, } from "../types/staffs";
import bcrypt from 'bcryptjs';

const saltRounds = 10;

const staffSchema = new Schema<IStaff, Model<IStaff>, StaffMethods >({
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
        validate: {
            validator: function (this: IStaff, v: string) {
            // Only validate password if it has been modified or is new
            if (this.isModified('password') || this.isNew) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(v);
            }
            return true; // Skip validation if password is unchanged
            },
            message: (props: { value: string }) =>
            `${props.value} is not a valid password! It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.`,
        },
    },
    //sử dụng để phân quyền
    role: {
        type: String,
        required: true,
        enum: ['admin', 'manager', 'staff'],
        default: 'staff',
    },
    //Phân quyền nâng cao hơn với permissions
    // permissions: {
    //     type: [String],
    //     default: [],
    // }
}, {
    timestamps: true,

});


//Methods compare password
staffSchema.methods.comparePassword = function (rawPassword: string): boolean {
    const staff = this as IStaff;
    //rawPassword: mật khẩu chưa mã hóa
    //staff.password: mật khẩu đã mã hóa
    return bcrypt.compareSync(rawPassword, staff.password);
};
//     const staff = this as IStaff;
//     //rawPassword: mật khẩu chưa mã hóa
//     //staff.password: mật khẩu đã mã hóa
//     return bcrypt.compareSync(rawPassword, staff.password);
// };

//Middleware pre save ở lớp database
//trước khi data được lưu xuống --> mã hóa mật khẩu
staffSchema.pre('save', async function (next) {
    const staff = this;

    //Nếu staff không có password thì không cần mã hóa
    if (staff.isModified('password')) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(staff.password, salt);
      staff.password = hash;
    }
  
    next();
});


const Staff = model("Staff", staffSchema);

export default Staff;