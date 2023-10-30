import { Schema, model } from 'mongoose';
import {IOrder, EnumPayments, EnumStatus, orderDetail} from '../types/models';

/**
 * Typescript
 * https://mongoosejs.com/docs/typescript/statics-and-methods.html
 */

// Create a new Model type that knows about IUserMethods...

/**
 * OrderDetailsSchema
 * là  Embed document của orderSchema theo quan hệ 1:1
 */
const OrderDetailsSchema = new Schema<orderDetail>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 90,
    },
  }
);

//Tạo một schema
const orderSchema = new Schema<IOrder>({
  createdDate: {
    type: Date,
    required: true,
    default: new Date
  },
  shippedDate: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    required: true,
    enum: [EnumStatus.Cancel, EnumStatus.Completed, EnumStatus.Waiting],
    default: EnumStatus.Waiting
  },
  description: {
    type: String
  },
  shippingAddress: {
    type: String,
    require: true
  },
  shippingCity: {
    type: String,
    require: true
  },
  paymentType: {
    type: String,
    required: true,
    enum: [EnumPayments.Cash, EnumPayments.Cod,EnumPayments.Credit],
    default: EnumPayments.Cash
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  orderDetail: [OrderDetailsSchema]
 
},
//Các options
{
  timestamps: true, //true tự tạo ra createAt và updateAt
}
);



//3. Tạo Model User
const Order = model<IOrder>('Order', orderSchema);
export default Order;