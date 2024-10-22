import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  category_name: {
    type: String,
    maxLength: [5, "Tối đa 5 kí tự"], //danh
    required: [true, "Yêu cầu điền"],
    unique: [true, "Không trùng lặp"],
  },
  description: {
    type: String,
    maxLength: 10,
    //required: false, //default
  },
  slug: {
    type: String,
    maxLength: 5, //danh
    required: true,
    unique: true,
  },
});

const Category = model("Category", categorySchema);
export default Category;
