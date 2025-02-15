import { Schema, model } from "mongoose";

/**
 * Định nghĩa cấu trúc collection Category
 */
const categorySchema = new Schema({
    category_name: String,
    description: String,
    slug: String
})

export default model('Category', categorySchema);