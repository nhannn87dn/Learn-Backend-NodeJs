import { Schema, model } from 'mongoose';
import { ICategory } from '../types/category.type';

const categorySchema = new Schema<ICategory>(
  {
    category_name: { 
        type: String, 
        required: [true, 'Category name is required'], 
        unique: true,
        trim: true,
        minLength: [3, 'Category name must be at least 3 characters long'],
        maxLength: [50, 'Category name must be at most 50 characters long'],
    },
    description: { 
        type: String, 
        trim: true 
    },
    slug: { type: String, 
        required: [true, 'Slug is required'], 
        unique: true, 
        index: true, 
        lowercase: true 
    },
  },
  {
    timestamps: true,// createdAt, updatedAt,
    collection: 'categories', //custom lại tên của collection
    versionKey: false, //loại bỏ trường __v
  }
);

const Category = model<ICategory>('Category', categorySchema);
export default Category;