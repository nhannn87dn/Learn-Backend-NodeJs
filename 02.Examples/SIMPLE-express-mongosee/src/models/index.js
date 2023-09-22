const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true, maxlength: 50 },
  description: { type: String, maxlength: 500 }
});

const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, unique: true, required: true, maxlength: 50 },
  phoneNumber: { type: String, unique: true, required: true, maxlength: 50 },
  address: { type: String, maxlength: 500 }
});

const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  email: { type: String, unique: true, required: true, maxlength: 50 },
  phoneNumber: { type: String, unique: true, required: true, maxlength: 50 },
  address: { type: String, maxlength: 500 },
  birthday: { type: Date }
});

const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  email: { type: String, unique: true, required: true, maxlength: 50 },
  phoneNumber: { type: String, unique: true, required: true, maxlength: 50 },
  address: { type: String, maxlength: 255 },
  photo: { type: String, maxlength: 255 },
  birthday: { type: Date },
  password: { type: String, required: true, minlength: 6, maxlength: 255 }
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 90 },
  stock: { type: Number, default: 0, min: 0 },
  description: { type: String },
  thumbnail: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }
});

const OrderDetailSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 90 }
});


const OrderSchema = new mongoose.Schema({
  createdDate: { type: Date, default: Date.now },
  shippedDate: { type: Date },
  status: { type: String, default: 'WAITING', enum: ['WAITING', 'COMPLETED', 'CANCEL'] },
  description: { type: String , maxlength: 500 },
  shippingAddress: { type: String, maxlength: 255},
  shippingCity: { type: String, required: true, maxlength: 50 },
  paymentType: { type: String, default: 'CASH', enum: ['CASH', 'CREDIT CARD'] },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  orderDetail: [OrderDetailSchema] // Nhúng OrderDetailSchema
});



module.exports = {
  Category: mongoose.model('Category', CategorySchema),
  Supplier: mongoose.model('Supplier', SupplierSchema),
  Customer: mongoose.model('Customer', CustomerSchema),
  Employee: mongoose.model('Employee', EmployeeSchema),
  Product: mongoose.model('Product', ProductSchema),
  Order: mongoose.model('Order', OrderSchema)
};