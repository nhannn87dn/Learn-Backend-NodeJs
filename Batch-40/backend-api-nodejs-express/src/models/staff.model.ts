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
        validate: {
            validator: function (v: string) {
              return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
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
  password: {
    type: String,
    maxLength: 255,
    require: true,
  }
}, {
    timestamps: true
})


//Middleware pre save ở lớp database
//trước khi data được lưu xuống --> mã hóa mật khẩu
staffSchema.pre('save', async function (next) {
    const staff = this;
  
    const hash = bcrypt.hashSync(staff.password, saltRounds);
  
    staff.password = hash;
  
    next();
});

  
export default model<IStaffEntity>('Staff', staffSchema);