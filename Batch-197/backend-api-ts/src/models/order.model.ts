import mongoose, { Schema, Model } from "mongoose";
import { IOrder, IOrderItem } from "../types/order";


const orderItemSchema = new Schema<IOrderItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    product_name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new Schema<IOrder>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
    //embedded document for order items
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items: IOrderItem[]) => items.length > 0,
        message: "Order must contain at least one item",
      },
    },
    // Tính toán subtotal, shippingFee, discount và total dựa trên items
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    // phí vận chuyển, giảm giá và tổng số tiền sẽ được tính toán dựa trên subtotal và các yếu tố khác
    shippingFee: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    // chiết khấu có thể được áp dụng dựa trên các chương trình khuyến mãi hoặc mã giảm giá
    discount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    // tổng thanh toán sẽ được tính toán dựa trên subtotal, shippingFee và discount
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    //thông tin địa chỉ giao hàng sẽ được lưu trữ trong embedded document để dễ dàng truy xuất và quản lý
    shippingAddress: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },

      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },

      street: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "shipping",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "bank_transfer", "cash", "credit_card", "paypal"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    collection: "orders",
    versionKey: false, // Loại bỏ trường __v
  }
);

const Order: Model<IOrder> =  mongoose.model<IOrder>("Order", orderSchema);
export default Order;