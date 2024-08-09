import { Schema, model } from 'mongoose';

const customerSchema = new Schema({
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
  street: {
    type: String,
    required: true,
    maxLength: 255
  },
  city: {
    type: String,
    required: true,
    maxLength: 50
  },
  state: {
    type: String,
    required: true,
    maxLength: 50
  },
  zip_code: {
    type: String,
    maxLength: 5,
    require: false,
  },
  password: {
    type: String,
    maxLength: 255,
    require: false,
    default: null
  },
  /* 
   Soft delete 
   Khi xóa sp thì đi update isDelete = true
   */
   isDelete: {
    type: Boolean,
    require: false,
    default: false
  },
},
{
  timestamps: true, //Tạo tự động thêm 2 trường createAt, updateAt
  //collection: 'category', //Tên collection Cố định theo tên bạn đặt
});

const Customer = model('Customer', customerSchema);

export default Customer