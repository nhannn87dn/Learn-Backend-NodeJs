import { Schema, model } from 'mongoose';
import {ICategory} from '../types/models';
import buildSlug from '../helpers/buildSlug';
// Mongoose Datatypes:
// https://mongoosejs.com/docs/schematypes.html
const categorySchema = new Schema({
  name: { 
    type: String, 
    required: [true, 'Tên bắt buộc phải nhập'],
    unique: true 
    },
  description: {
    type: String,
    maxLength: [500, 'Cho phép tối đa 500 kí tự']
  },
  photo: String,
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
          const slugRegex = /^([a-z0-9\-]+)$/;
          return slugRegex.test(value);
        }

        return true;
      },
      message: 'Slug must be unique and contain only letters, numbers, and hyphens'
    },
  },
}
,
//Các options
{
  timestamps: true, //true tự tạo ra createAt và updateAt
});

categorySchema.pre("save", async function (next) {
    if(this.slug == ""){
        this.slug = buildSlug(this.name);
    }
    next();
  });
  

const Category = model<ICategory>('Category', categorySchema);
export default Category;
