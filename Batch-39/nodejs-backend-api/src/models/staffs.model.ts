import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt'
import {TStaff} from '../types/models'

//Cách dùng: https://www.npmjs.com/package/bcrypt#esm-import
const saltRounds = 10;

const staffSchema = new Schema<TStaff>({
  first_name: {
    type: String,
    required: true,
    maxLength: 50
  },
  last_name: {
    type: String,
    required: true,
    maxLength: 50
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 150
  },
  /* Khóa tài khoản */
  active: {
    type: Boolean,
    default: true,
    require: true
  },
  password: {
    type: String,
    require: true
  }
},
{
  timestamps: true, //Tạo tự động thêm 2 trường createAt, updateAt
  //collection: 'category', //Tên collection Cố định theo tên bạn đặt
  toJSON: { virtuals: true }, // <-- include virtuals in `JSON.stringify()`
  toObject: { virtuals: true },
});


// Virtual for this genre instance fullName.
staffSchema.virtual('fullName').get(function () {
  return this.first_name + ' ' + this.last_name;
});

staffSchema.pre('save', async function (next) {
  const staff = this;

  const hash = bcrypt.hashSync(staff.password, saltRounds);

  staff.password = hash;

  next();
});

const Staff = model<TStaff>('Staff', staffSchema);

export default Staff