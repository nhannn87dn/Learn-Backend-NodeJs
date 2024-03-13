import { Schema, model } from 'mongoose';
import {IProduct} from '../types/models';
import buildSlug from '../helpers/buildSlug';

/**
 * Typescript
 * https://mongoosejs.com/docs/typescript/statics-and-methods.html
 */

// Create a new Model type that knows about IUserMethods...

//Tạo một schema
const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  stock: {
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
    max: 100,
  },
 
  description: {
    type: String,
    required: false,
    maxLength: 3000, //Tối đã 3000 ký tự
  },
  supplierId: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  },
  //Nếu đặt tên key = tên Model thì không cần virtuals populate lean
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  images: {
    type: Array,
    default: []
  },
  thumb: {
    type: String,
  },
  slug: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    maxLength: 160,
    validate: {
      validator: function (value: string) {
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
},
//Các options
{
  timestamps: true, //true tự tạo ra createAt và updateAt
  toJSON: { virtuals: true }, // <-- include virtuals in `JSON.stringify()`
  toObject: { virtuals: true },
}
);

// Virtual for this genre instance fullName.
productSchema.virtual('salePrice').get(function() {
  return this.price * (1 - this.discount / 100);
});

productSchema.pre("save", async function (next) {
  if(this.slug == ""){
      this.slug = buildSlug(this.name);
  }
  next();
});


//3. Tạo Model User
const Product = model<IProduct>('Product', productSchema);
export default Product;