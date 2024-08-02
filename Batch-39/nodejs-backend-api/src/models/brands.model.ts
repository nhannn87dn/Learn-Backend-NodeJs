import { Schema, model } from 'mongoose';

/* Khởi tạo một Schema */

const brandSchema = new Schema({
  brand_name: {
    type: String,
    require: true, //mặc định true, nếu bạn ko liệt kê vào
    minLength: [4, "Tên danh mục tối thiểu phải 4 kí tự"],
    maxLength: 50, //Tối đa 50 kí tự
    unique: true, //chống trùng lặp tên danh mục
    trim: true, // tự động cắt kí tự trắng trước/sau vd: "   Laptop " ==> "Laptop"
  },
  description: {
    type: String,
    require: false, //mặc định true, nếu bạn ko liệt kê vào
    maxLength: 500, //Tối đa 500 kí tự
    trim: true, // tự động cắt kí tự trắng trước/sau vd: "   Laptop " ==> "Laptop"
  },
  /**
   * Vì sao cần slug ---> để SEO
   * brand_name: Điện thoại
   * slug: dien-thoai
   */
  slug: {
    type: String,
    require: true, //mặc định true, nếu bạn ko liệt kê vào
    maxLength: 50, //Tối đa 50 kí tự
    unique: true, //chống trùng lặp tên danh mục
    trim: true, // tự động cắt kí tự trắng trước/sau vd: "   Laptop " ==> "Laptop"
  },
  order: {
    type: Number,
    default: 50, //giá trị mặc định khi ko điền,
    min: 1, //giá trị tối thiểu chấp nhận là 1
  }
},
{
  timestamps: true, //Tạo tự động thêm 2 trường createAt, updateAt
  //collection: 'categories'
}
)

//Export một Model

const Brand = model('Brand', brandSchema);
export default Brand;