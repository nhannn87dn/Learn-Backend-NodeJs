import { Schema, model } from 'mongoose';
import { ISupplier } from '../types/models';

const supplierSchema = new Schema<ISupplier>({
  name: {
    type: String,
    require: true,
    minLength: 4
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
  }
},
//Các options
{
  timestamps: true, //true tự tạo ra createAt và updateAt
});

//3. Tạo Model Category
const Supplier = model<ISupplier>('Supplier', supplierSchema);
export default Supplier;