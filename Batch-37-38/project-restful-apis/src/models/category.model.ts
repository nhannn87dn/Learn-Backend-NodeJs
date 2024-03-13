import { Schema, model } from 'mongoose';
import { ICategory } from '../types/models';

const categorySchema = new Schema(
    {
      categoryName: {
        type: String,
        required: [true, 'Yeu cau dien Category Name'],
        unique: [true, 'Category Name khong the trung lap'],
        minLength: [5, 'Toi thieu phai du 5 ki tu'],
        maxLength : [50, 'Toi da cho phep 50 ki tu'],
      },
      description: {
        type: String,
        required: false,
        max: 500
      },
      slug: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        max: 255,
        validate: {
            validator: function (value: string) {
                const slugRegex = /^[a-z0-9\-]+$/;
                return slugRegex.test(value);
            },
            message: 'Slug must be unique and contain only letters, numbers, and hyphens'
          },
      },
      sort: {
        type: Number,
        default: 50,
        min: 1
      },
      isActive: {
        type: Boolean,
        default: true,
        enum: ['true', 'false']
      }
    },
    {
        timestamps: true 
        //created_at
        //updated_at
    }
);

const Category = model<ICategory>('Category', categorySchema);
export default Category;

