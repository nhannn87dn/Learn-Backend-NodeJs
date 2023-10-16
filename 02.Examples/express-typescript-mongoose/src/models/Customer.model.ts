import { Schema, model } from 'mongoose';
import {IEmployee, EmployeeModel, IEmployeeMethods} from '../types/models';
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;

/**
 * Typescript
 * https://mongoosejs.com/docs/typescript/statics-and-methods.html
 */

// Create a new Model type that knows about IUserMethods...

//Tạo một schema
const customerSchema = new Schema<IEmployee, EmployeeModel, IEmployeeMethods>({
  firstName: {
    type: String,
    require: true, //bắt buộc điền
    trim: true, //cắt kí tự rỗng ở 2 đầu: " Nhan " ==> "Nhan"
    minlength: [6, "Ít nhất 4 kí tự"], //sinh ra lỗi bằng tiếng anh
    maxlength: [12, 'Chỉ cho phép tối đa 12 kí tự'],
  },
  lastName: {
    type: String,
    require: true, //bắt buộc điền
    trim: true, //cắt kí tự rỗng ở 2 đầu: " Nhan " ==> "Nhan"
    minLength: 6, //sinh ra lỗi bằng tiếng anh
    maxLength: [12, 'Chỉ cho phép tối đa 12 kí tự'],
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v: string) {
        return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value: string) {
        const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        return phoneRegex.test(value);
      },
      message: `{VALUE} is not a valid phone!`,
      // message: (props) => `{props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    min: [8, "Ít nhất là 6 kí tự"],
    validate: {
      validator: function (v: string) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid password!`,
    },
  },
  address: { type: String, required: true },
  birthDay: { type: Date },
},
//Các options
{
  timestamps: true, //true tự tạo ra createAt và updateAt
  toJSON: { virtuals: true }, // <-- include virtuals in `JSON.stringify()`
  toObject: { virtuals: true },
}
);

// Virtual for this genre instance fullName.
customerSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});


customerSchema.statics.isEmailTaken = async function(email, excludeId) {
  const item = await this.findOne({
    email,
    _id: {
      $ne: excludeId,
    },
  });
  return !!item;
};

customerSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


customerSchema.pre('save', function (next) {
    var user = this;
  
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
  
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err);
      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  });
//3. Tạo Model User
const Customer = model<IEmployee, EmployeeModel>('Customer', customerSchema);
export default Customer;