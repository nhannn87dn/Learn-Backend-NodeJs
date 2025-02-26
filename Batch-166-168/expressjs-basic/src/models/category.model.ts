import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  category_name: {
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

const Category = model("Category", categorySchema);
export default Category;
