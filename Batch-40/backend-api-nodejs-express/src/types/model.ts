import { Model, ObjectId } from "mongoose";

export type TCustomer = {
  _id?: ObjectId;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip_code?: string;
  password?: string;
  active?: boolean;
  isDelete?: boolean;
}
export interface ICategoryCreate {
    category_name: string;
    description: string;
}

export interface IStaffEntity {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    active: boolean,
  }

export interface TStaff  {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    active?: boolean,
  }


  export enum  EnumOrderStatus {
    Pending = 'pending',
    Confirmed = 'confirmed',
    Canceled = 'canceled',
    PrepareShipping = 'prepareShipping',
    Shipping = 'shipping',
    CancelShipping = 'cancelShipping',
    Shipped = 'shipped',
    PendingPaid = 'pendingPaid',
    Paid = 'paid',
    Refund = 'refund',
    Finished = 'finished'
  }
  
  export enum  EnumPayments {
    Cash = 'CASH',
    Credit = 'CREDIT',
    Cod = 'COD'
  }
export type TOrderItems = {
  product: ObjectId;
  quantity: number;
  price: number;
  discount: number;
  thumbnail?: string;
  product_name?: string;
}

export interface IOrderDTO {
  customer: TCustomer,
  street: string,
  city: string,
  state: string,
  zip_code?: string,
  payment_type: number,
  order_note?: string,
  order_items: TOrderItems[],
}

export interface IOrder {
  customer?: ObjectId;
  staff?: ObjectId;
  order_date: Date,
  require_date?: Date,
  shipping_date?: Date,
  order_status: number,
  street: string,
  city: string,
  state: string,
  zip_code?: string,
  payment_type: number,
  order_note?: string,
  order_items: TOrderItems[],
  createdAt?: Date,
  isDelete?: boolean
}

export interface IPayloadOrder {
  orderItems: TOrderItems[],
  orderNote?: string,
  paymentType: EnumPayments,
  customer: {
      _id?: string,
      firstName: string,
      lastName: string,
      email: string,
      phone: string,
      street: string,
      city: string,
      state: string,
      zip_code?: string,
  }
 
}
// Models and schemas
export type OrderModelType = Model<IOrder>;



