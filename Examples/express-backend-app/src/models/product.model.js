const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const buildSlug = require('../helpers/buildSlug')

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
  position: { type: Number, default: 0 }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    maxLength: 160,
    validate: {
      validator: function (value) {
        if (!value) return true;
        
        /** Nếu có điền thì validate */
        if (value.length > 0) {
          const slugRegex = /^[a-z0-9\-]+$/;
          return slugRegex.test(value);
        }

        return true;
      },
      message: 'Slug must be unique and contain only letters, numbers, and hyphens'
    },
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
  meteTitle: {
    type: String,
    required: false,
    maxLength: 255,
  },
  meteDescription: {
    type: String,
    required: false,
    maxLength: 255,
  },
  content: {
    type: String,
    required: false,
    maxLength: 3000, //Tối đã 3000 ký tự
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


productSchema.pre("save", async function (next) {
  if(this.slug == ""){
      this.slug = buildSlug(this.name);
  }
  next();
});


const Product = mongoose.model('Product', productSchema);

module.exports = {
  Product
};
