import { Schema, model, Document } from "mongoose";

const brandSchema = new Schema({
  brand_name: {
    type: String,
    maxLength: [255, "Tối đa 5 kí tự"], //danh
    required: [true, "Yêu cầu điền"],
    unique: [true, "Không trùng lặp"],
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
}, {
  timestamps: true, //Tu tao them createdAt và updatedAt
});

const Brand = model("Brand", brandSchema);
export default Brand;
