const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

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
  url: {
    type: String,
    required: true,
  },
});

const productImageSchema = new mongoose.Schema({
   images: {
    type: [imageSchema],
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
  categoryId: {
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
  productImageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductImage',
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

// productSchema.virtual('numImages').get(function() {
//   return this.gallery.images.length;
// });


// productSchema.virtual('brand', {
//   ref: 'Brand',
//   localField: 'brandId',
//   foreignField: '_id',
//   justOne: true,
// });

// productSchema.virtual('images', {
//   ref: 'ProductImage',
//   localField: 'productImageId',
//   foreignField: '_id',
//   justOne: true,
// });

productSchema.set('toJSON', { virtuals: true });
// Virtuals in console.log()
productSchema.set('toObject', { virtuals: true });


// productSchema.plugin(mongooseLeanVirtuals);

const ProductImage = mongoose.model('ProductImage', productImageSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = {
  Product,
  ProductImage,
};
