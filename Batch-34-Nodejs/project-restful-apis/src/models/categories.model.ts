import { Schema, model } from 'mongoose';
import { ICategory } from '../types/models';

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    require: true,
    unique: true,
    minLength: 4
  },
  description: {
    type: String,
    maxLength: 500
  }
},
{
  timestamps: true //tạo thêm trường ngày tháng
}
);

//3. Tạo Model Category
const Category = model<ICategory>('Category', categorySchema);
export default Category;