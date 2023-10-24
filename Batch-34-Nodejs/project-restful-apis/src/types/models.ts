import { ObjectId, Date } from "mongoose";

export interface ICategory {
  _id?: ObjectId;
  name: string;
  description: string;
}

export interface ISupplier {
  _id?: ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}


export interface IProduct {
  _id?: ObjectId;
  name: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  categoryId: ObjectId;
  supplier: ObjectId;
  slug: string,
  thumbnail: string
}


export interface IEmployee {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  birthDay?: Date,
  password: string;
  photo?: string;
  role: string;
}



//---------------Orders-----------------------//


export enum  EnumStatus {
  Waiting = 'WAITING',
  Completed = 'COMPLETE',
  Cancel = 'CANCEL'
}

export enum  EnumPayments {
  Cash = 'CASH',
  Credit = 'CREDIT CARD',
  Cod = 'COD'
}

//Chỉ chấp nhận số Dương
type PositiveNumber = number & { __positiveNumber: true };


export type orderDetail = {
  _id: ObjectId;
  quantity: number;
  price: number;
  discount: number;
}
export interface IOrder {
  createdDate: Date,
  shippedDate: Date,
  status: EnumStatus,
  description?: string,
  shippingAddress: string,
  shippingCity: string,
  paymentType: EnumPayments,
  customer: ObjectId;
  employee: ObjectId;
  orderDetail: orderDetail[]
}


//---------------OrderDetails-----------------------//