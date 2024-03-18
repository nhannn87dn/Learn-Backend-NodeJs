import { Schema, model } from 'mongoose';
import { IProduct } from '../types/models';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import buildSlug from '../helpers/slugHelper'

const productSchema = new Schema(
    {
      productName: {
        type: String,
        required: [true, 'Yeu cau dien productName'],
        unique: [true, 'productName khong the trung lap'],
        minLength: [5, 'Toi thieu phai du 5 ki tu'],
        maxLength : [255, 'Toi da cho phep 255 ki tu'],
      },
      /**
       * QUAN HỆ ONE-ONE
       * 1 SP thuộc 1 Danh mục
       */
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
        required: false,
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
      },
      isDelete: {
        type: Boolean,
        default: false,
        enum: ['true', 'false']
      },
      isBest: {
        type: Boolean,
        default: false,
        enum: ['true', 'false']
      },
      isNew: {
        type: Boolean,
        default: false,
        enum: ['true', 'false']
      },
      isHot: {
        type: Boolean,
        default: false,
        enum: ['true', 'false']
      },
      isHome: {
        type: Boolean,
        default: false,
        enum: ['true', 'false']
      }
    },
    {
        timestamps: true 
        //created_at
        //updated_at
    }
);

/* Khai báo khóa ngoại với Category Model */
productSchema.virtual('brand', {
  ref: 'Brand',
  localField: 'brandId',
  foreignField: '_id',
  justOne: true,
});

productSchema.set('toJSON', { virtuals: true });
// Virtuals in console.log()
productSchema.set('toObject', { virtuals: true });
//dùng cái này cho hiệu suất join nhanh hơn
//khi dùng thằng này
//.lean({virtuals: true})
productSchema.plugin(mongooseLeanVirtuals);

productSchema.virtual('url').get(function () {
  return '/products/' + this._id;
});

productSchema.query.byName = function (name: string) {
  return this.where({ productName: new RegExp(name, 'i') });
};
//Middleware
productSchema.pre("save", async function (next) {
  /**
   * Tự động tạo slug khi slug ko được truyền
   * hoặc slug = ''
   */
  if(this.slug == "" || !this.slug){
      this.slug = buildSlug(this.productName);
  }
  next();
});


const Product = model<IProduct>('Product', productSchema);
export default Product;

