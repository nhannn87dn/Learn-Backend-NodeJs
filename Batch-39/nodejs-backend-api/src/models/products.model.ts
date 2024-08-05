import { Schema, model } from 'mongoose';
import mongooseLeanVirtuals  from 'mongoose-lean-virtuals'
/* Khởi tạo một Schema */

const productSchema = new Schema({
  product_name: {
    type: String,
    require: true, //mặc định true, nếu bạn ko liệt kê vào
    maxLength: 255, //Tối đa 255 kí tự
    unique: true, //chống trùng lặp tên danh mục
    trim: true, // tự động cắt kí tự trắng trước/sau vd: "   Laptop " ==> "Laptop"
  },
  price: {
    type: Number,
    min: 0,
    default: 0
  },
  discount: {
    type: Number,
    min: 0,
    max: 70,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId, //_id
    ref: 'Category',
    required: true
  },
  brandId: {
    type: Schema.Types.ObjectId, //_id
    ref: 'Brand',
    required: true
  },
  model_year: {
    type: Number
  },
  description: {
    type: String,
    require: false, //mặc định true, nếu bạn ko liệt kê vào
    maxLength: 500, //Tối đa 500 kí tự
    trim: true, // tự động cắt kí tự trắng trước/sau vd: "   Laptop " ==> "Laptop"
  },
  thumbnail: {
    type: String,
    require: false,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
    require: false,
  },
  /**
   * Vì sao cần slug ---> để SEO
   * category_name: Điện thoại
   * slug: dien-thoai
   */
  slug: {
    type: String,
    require: true, //mặc định true, nếu bạn ko liệt kê vào
    maxLength: 255, //Tối đa 50 kí tự
    unique: true, //chống trùng lặp tên danh mục
    trim: true, // tự động cắt kí tự trắng trước/sau vd: "   Laptop " ==> "Laptop"
  },
  order: {
    type: Number,
    default: 50, //giá trị mặc định khi ko điền,
    min: 1, //giá trị tối thiểu chấp nhận là 1
    require: false,
  },
  /* SP bán nổi bật */
  isBest: {
    type: Boolean,
    require: false,
    default: false
  },
  /* SP mới về */
  isNew: {
    type: Boolean,
    require: false,
    default: false
  },
  /* Show sp ra trang chủ */
  isShowHome: {
    type: Boolean,
    require: false,
    default: false
  },
   /* Soft delete */
   isDelete: {
    type: Boolean,
    require: false,
    default: false
  },
},
{
  timestamps: true, //Tạo tự động thêm 2 trường createAt, updateAt
  //collection: 'category', //Tên collection Cố định theo tên bạn đặt
}
)


/* Khai báo khóa ngoại với Brand Model */
productSchema.virtual('brand', {
  ref: 'Brand',
  localField: 'brandId',
  foreignField: '_id',
  justOne: true,
});

productSchema.set('toJSON', { virtuals: true });
// Virtuals in console.log()
productSchema.set('toObject', { virtuals: true });

productSchema.plugin(mongooseLeanVirtuals);

//Export một Model

const Product = model('Product', productSchema);
export default Product;