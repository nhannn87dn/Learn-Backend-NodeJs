import { Schema, model } from 'mongoose';
import { IOrder, OrderModelType, TOrderItems } from '../types/model';

const orderItemsSchema = new Schema<TOrderItems>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    require: true
  },
  quantity: {
    type: Number,
    min: 1
  },
  price: {
    type: Number,
    min: 0
  },
  discount: {
    type: Number,
    min: 0
  }
})

const ordersSchema = new Schema<IOrder, OrderModelType>({
  customer: {
    type: Schema.Types.ObjectId, //_id
    ref: 'Customer',
    required: true,
  },
  //Staff là người duyệt đơn, mặc định đơn mới chưa có người duyệt
  staff: {
    type: Schema.Types.ObjectId, //_id
    ref: 'Staff',
    required: false,
    default: null, // mặc định null chưa có người duyệt
  },
  order_status: {
    type: Number,
    required: false,
    /**
     * Order status: 
     * 1 = Pending; 
     * 2 = Processing; 
     * 3 = Rejected; 
     * 4 = Completed
     */
    enum:[1,2,3,4],
    default: 1, // mặc định khi tạo đơn mới
  },
  payment_type: {
    type: Number,
    required: false,
    /**
     * payment type: 
     * 1 = COD; 
     * 2 = Credit; 
     * 3 = ATM; 
     * 4 = Cash
     */
    enum:[1,2,3,4],
    default: 4, // mặc định khi tạo đơn mới
  },
  order_date: {
    type: Date,
    required: false,
    default: new Date, //mặc định lấy time hiện tại
  },
  require_date: {
    type: Date,
    required: false,
    default: null, //mặc định null
  },
  shipping_date: {
    type: Date,
    required: false,
    default: null, //mặc định null
  },
  order_note: {
    type: String,
    required: false
  },
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
  order_items: [orderItemsSchema], //mảng sản phẩm
  createdAt: {
    type: Date,
    default: Date.now,
    required: false
  },
  /* 
   Soft delete 
   Khi xóa sp thì đi update isDelete = true
   thực tế chỉ được xóa đơn hàng đã hủy
   */
   isDelete: {
    type: Boolean,
    require: false,
    default: false
  },
},
{
  timestamps: true, 
  
}
);



const Order = model<IOrder, OrderModelType>('Order', ordersSchema);

export default Order