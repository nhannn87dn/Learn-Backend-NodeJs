import { Schema, model, Types } from "mongoose";

const productSchema = new Schema({
  product_name: {
    type: String,
    maxLength: [255, "Tối đa 255 kí tự"], //danh
    required: [true, "Yêu cầu điền"],
    unique: [true, "Không trùng lặp"],
  },
  price: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  discount: {
    type: Number,
    required: false,
    default: 0,
    min: 0,
    max: 70,
  },
  category: {
    type: Types.ObjectId,
    ref: "Category",
    require: true,
  },
  brand: {
    type: Types.ObjectId,
    ref: "Brand",
    require: true,
  },
  description: {
    type: String,
    maxLength: 500,
    //required: false, //default
  },
  slug: {
    type: String,
    maxLength: 255, //danh
    required: true,
    unique: true,
    lowercase: true
  },
  model_year: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    maxLength: 255,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
    //select: false, //default: true, true = co liet ke o ket qua truy van
  },
}, {
  timestamps: true, //Tu tao them createdAt và updatedAt
});

const Product = model("Product", productSchema);
export default Product;
