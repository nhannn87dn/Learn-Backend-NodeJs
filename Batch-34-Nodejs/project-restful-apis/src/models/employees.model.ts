import { Schema, model } from 'mongoose';
import {IEmployee} from '../types/models'

const employeeSchema = new Schema<IEmployee>({
  firstName: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 50
  },
  lastName: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    type: String,
    maxLength: 50,
    unique: true,
    require: true
  },
  phoneNumber: {
    type: String,
     maxLength: 50,
     unique: true,
  },
  address: {
    type: String,
    maxLength: 255
  },
  birthDay: {
    type: Date
  },
  password: {
    required: true,
    type: String,
    min: [8, "Ít nhất là 8 kí tự"],
    validate: {
      validator: function (v: string) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid password!`,
    },
  },
  photo: {
    type: String
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "User", "Editor"], //Chỉ cho phép 1 trong 3 giá trị này
    default: 'User' //Mặc định nó có quyền cơ bản nhất
  }
}
,
//Các options
{
  timestamps: true, //true tự tạo ra createAt và updateAt
});


const Employee = model<IEmployee>('Employee', employeeSchema);
export default Employee;