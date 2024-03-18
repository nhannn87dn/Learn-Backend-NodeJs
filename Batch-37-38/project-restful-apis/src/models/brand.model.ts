import { Schema, model } from 'mongoose';
import { IBrand } from '../types/models';

const brandSchema = new Schema(
    {
      brandName: {
        type: String,
        required: [true, 'Yeu cau dien Brand Name'],
        unique: [true, 'Brand Name khong the trung lap'],
        minLength: [2, 'Toi thieu phai du 5 ki tu'],
        maxLength : [50, 'Toi da cho phep 50 ki tu'],
        //trim: true, // ' brand ' ==> 'brand'
      },
      description: {
        type: String,
        required: false,
        maxLength: 500
      },
      //iphone-15
      slug: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        maxLength: 255,
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

const Brand = model<IBrand>('Brand', brandSchema);
export default Brand;

