import { model, Schema } from 'mongoose';

//Định nghĩa schema
const productSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
      unique: true, //Không được trùng lặp
      maxLength: 255, //Độ dài tối đa 255 ký tự
    },
    description: {
      type: String,
      required: false, //Không bắt buộc
      default: null,
      maxLength: 500,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      maxLength: 255,
    },
    price: {
      type: Number,
      required: false,
      default: 0,
      min: 0, //Giá không được âm
    },
    discount: {
      type: Number,
      required: false,
      default: 0,
    },
    modelYear: {
      type: Number,
      required: true,
      min: 1900, //Năm không được nhỏ hơn 1900
    },
    thumbnail: {
      type: String,
      required: false,
      default: null,
    },
    stock: {
      type: Number,
      required: false,
      default: 0,
      min: 0, //Số lượng tồn kho không được âm
    },
    //RELATIONSHIP
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    //isNew
    isNew: {
      type: Boolean,
      default: false,
      required: false,
    },
    // bán hoặc không bán
    isOnSale: {
      type: Boolean,
      default: false,
      required: false,
    },
    softDelete: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'products',
  }
);

//Tạo model
const Product = model('Product', productSchema);
export default Product;
