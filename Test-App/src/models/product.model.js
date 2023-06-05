const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const arrayLimit = (val) => val.length <= 5;

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Customer',
    },
  },
  { timestamps: true }
);

const imageSchema = new mongoose.Schema({
  url: { type: String },
  alt: { type: String },
  caption: { type: String },
  position: { type: Number, required: true }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  },
  //Nếu đặt tên key = tên Model thì không cần virtuals populate lean
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  reviews: {
    type: [reviewSchema],
    default: [],
  },
  thumbnail: {
    type: String
  },
  images: {
    type: [imageSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 15'], // giới hạn số lượng hình ảnh
    default: []
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Number,
    required: false,
    default: 0,
    min: 0,
    max: 100,
  },
});


// Virtual for this genre instance URL.
productSchema.virtual("url").get(function () {
  return "/products/" + this._id;
});


productSchema.virtual('salePrice').get(function() {
  return this.price * (1 - this.discount / 100);
});

productSchema.virtual('numImages').get(function() {
  return this.images.length;
});

/* Tạo trường ảo khi bạn dùng brandId làm tên reference */
productSchema.virtual('brand', {
  ref: 'Brand',
  localField: 'brandId',
  foreignField: '_id',
  justOne: true,
});


productSchema.set('toJSON', { virtuals: true });
// Virtuals in console.log()
productSchema.set('toObject', { virtuals: true });


productSchema.plugin(mongooseLeanVirtuals);

const Product = mongoose.model('Product', productSchema);

module.exports = {
  Product
};
