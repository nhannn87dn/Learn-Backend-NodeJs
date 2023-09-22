const mongoose = require('mongoose');
const { Schema } = mongoose;

const actionLogsSchema = new Schema({
  action: {
    type: String,
    required: true,
    default: 'note'
  },
  note: {
    type: String,
    required: true,
  },
  addTime: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const OrderDetailsSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
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
      max: 100,
    },
  }
);


const orderSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [OrderDetailsSchema],
  shippedDate: {
    type: Date,
    validate: {
      validator: function (value) {
        /** Nếu có điền thì validate */
        if (!value) return true;

        if (value < this.createdDate) {
          return false;
        }

        return true;
      },
      message: `Shipped date: {VALUE} is invalid!`,
    },
  },
  paidDate: {
    type: Date,
    validate: {
      validator: function (value) {
        /** Nếu có điền thì validate */
        if (!value) return true;

        if (value < this.createdDate) {
          return false;
        }

        return true;
      },
      message: `Paid date: {VALUE} is invalid!`,
    },
  },
  deliveredDate: {
    type: Date,
    validate: {
      validator: function (value) {
        /** Nếu có điền thì validate */
        if (!value) return true;

        if (value < this.createdDate && value < this.shippedDate) {
          return false;
        }

        return true;
      },
      message: `deliveredDate date: {VALUE} is invalid!`,
    },
  },
  paymentMethod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentMethod',
    required: true
  },
  shippingMethod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShippingMethod',
    required: true
  },
  status: {
    type: String,
    enum: [
      "pending", //Mới đặt hàng
      "confirmed", //Đã xác nhận đơn hàng
      "canceled", //Hủy đơn hàng
      "prepareShipping", //chuẩn bị giao hàng
      "shipping", //đang giao hàng
      "cancelShipping", //hủy giao hàng
      "shipped", //đã giao hàng
      "paid", //đã thanh toán
      "refund", //hoàn tiền
      "finished", //hoàn thành
    ],
    default: "pending",
  },
  actionsLog: {
    type: [actionLogsSchema],
    default: [],
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true
  }
});

orderSchema.pre("save", function (next) {
  const order = this;
  let total = 0;

  // tính tổng giá trị đơn hàng từ sản phẩm trong đơn hàng
  order.products.forEach((product) => {
    total += product.price * product.quantity * (1 - product.discount / 100);
  });

  // gán giá trị tổng vào trường "total" trong đơn hàng
  order.total = total;

  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order