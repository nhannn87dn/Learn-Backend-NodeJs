import { model, Schema } from "mongoose";
import { ICustomer } from "../types/customers";

const CustomerSchema = new Schema<ICustomer>(
  {
    first_name: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      maxLength: 50,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    email: {
      type: String,
      required: true,
      maxLength: 150,
      unique: true,
      lowercase: true,
      trim: true,
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
    },
    street: {
      type: String,
      maxLength: 255,
      default: '',
      trim: true,
    },
    city: {
      type: String,
      maxLength: 50,
      default: '',
      trim: true,
    },
    state: {
      type: String,
      maxLength: 50,
      default: '',
      trim: true,
    },
    zip_code: {
      type: String,
      maxLength: 5,
      default: null,
    },
    password: {
      type: String,
      maxLength: 255,
      default: null,
    },
    //Có khoá tài khoản không ?
    active: {
        type: Boolean,
        default: true,
        enum: ['true', 'false'],
    },
  },
  {
    timestamps: true, // Thêm createdAt & updatedAt
    versionKey: false,
  }
);

//Tạo model
const Customer = model<ICustomer>('Customer', CustomerSchema);
export default Customer;