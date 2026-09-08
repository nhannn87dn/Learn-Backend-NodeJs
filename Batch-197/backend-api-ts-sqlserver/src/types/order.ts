import mongoose, { Document } from "mongoose";

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  product_name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface IOrder extends Document {
  customerId: mongoose.Types.ObjectId;

  items: IOrderItem[];

  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;

  shippingAddress: {
    firstName: string;
    lastName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
  };

  status: "pending" | "confirmed" | "shipping" | "completed" | "cancelled";

  paymentMethod: "cod" | "bank_transfer" | "cash" | "credit_card" | "paypal";

  paymentStatus: "pending" | "paid" | "failed";

  createdAt: Date;
  updatedAt: Date;
}

export type CustomerCheckoutInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
};

export type CreateOrderDto = Omit<IOrder, keyof Document | 'createdAt' | 'updatedAt' | 'customerId' | 'status' | 'paymentStatus' | 'subtotal' | 'total'> & {
  customerId?: mongoose.Types.ObjectId | string;
  customer?: CustomerCheckoutInfo;
  status?: IOrder['status'];
  paymentStatus?: IOrder['paymentStatus'];
  subtotal?: number;
  total?: number;
};
export type UpdateOrderDto = Partial<CreateOrderDto>;