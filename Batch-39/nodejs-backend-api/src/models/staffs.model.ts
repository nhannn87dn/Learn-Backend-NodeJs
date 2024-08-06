import { Schema, model } from 'mongoose';

const staffSchema = new Schema({
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
    require: false
  },
  password: {
    type: String,
    maxLength: 255,
    require: false,
    default: null
  },
  role: {
    type: String,
    enum: ['supper', 'admin', 'user'],
    default: 'user',
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

const Staff = model('Staff', staffSchema);

export default Staff