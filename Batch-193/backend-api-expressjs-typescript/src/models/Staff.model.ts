import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'
import { IStaffEntity } from "../types/model";

const saltRounds = 10;

const staffSchema = new Schema<IStaffEntity>({
    first_name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    last_name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
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
              //Nếu không thì bỏ qua kiểm tra
              if (this.isModified('email') || this.isNew) {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
              }
              return true; // Skip validation if email is unchanged
            },
            message: (props: {value: string}) => `${props.value} is not a valid email!`,
          },
    },
    /* Khóa tài khoản */
  active: {
    type: Boolean,
    default: true,
    required: true,
    enum: ['true', 'false'],
  },
  //1 user có nhiều roles = ['staff', 'admin', 'superadmin']
  roles: {
    type: [String],
    default: ['staff'],
    enum: ['staff', 'admin', 'superadmin'],
  },
  password: {
    type: String,
    minLength: 6,
    maxLength: 255,
    require: true,
    validate: {
        validator: function (this: IStaffEntity, v: string) {
          // Only validate password if it has been modified or is new
          if (this.isModified('password') || this.isNew) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(v);
          }
          return true; // Skip validation if password is unchanged
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid password! It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.`,
      },
  }
}, {
    timestamps: true,
    versionKey: false,
    virtuals: {
      fullName: {
        get(this: IStaffEntity) {
          return `${this.first_name} ${this.last_name}`;
        }
    }
    },
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        const { password, ...rest } = ret; // Destructure to exclude password
        return rest;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        const { password, ...rest } = ret; // Destructure to exclude password
        return rest;
      },
    }
})


//Middleware pre save ở lớp database
//trước khi data được lưu xuống --> mã hóa mật khẩu
staffSchema.pre('save', async function (next) {
    const staff = this;

    //Nếu staff không có password thì không cần mã hóa
    if (staff.isModified('password')) {
      const hash = bcrypt.hashSync(staff.password, saltRounds);
      staff.password = hash;
    }
  
    next();
});

  
export default model<IStaffEntity>('Staff', staffSchema);