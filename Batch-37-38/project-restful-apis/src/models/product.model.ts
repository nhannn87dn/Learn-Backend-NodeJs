import { Schema, model } from 'mongoose';
import { IProduct } from '../types/models';

const productSchema = new Schema(
    {
      productName: {
        type: String,
        required: [true, 'Yeu cau dien productName'],
        unique: [true, 'productName khong the trung lap'],
        minLength: [5, 'Toi thieu phai du 5 ki tu'],
        maxLength : [255, 'Toi da cho phep 255 ki tu'],
      },
      category: {
        type: Schema.Types.ObjectId, //_id
        ref: 'Category',
        required: true
      },
      price: {
        type: Number,
        default: 0,
        min: 0,
      },
      stock: {
        type: Number,
        default: 0,
        min: 0,
      },
      discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      modelYear: {
        type: String,
        maxLength: 4
      },
      description: {
        type: String
      },
      thumbnail: {
        type: String,
        maxLength: 50,
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

const Product = model<IProduct>('Product', productSchema);
export default Product;

