import { Schema, model } from 'mongoose';
import {ISupplier} from '../types/models';
import buildSlug from '../helpers/buildSlug';

/**
 * Typescript
 * https://mongoosejs.com/docs/typescript/statics-and-methods.html
 */

// Create a new Model type that knows about IUserMethods...

//Tạo một schema
const supplierSchema = new Schema<ISupplier>({
  name: { 
    type: String, 
    required: [true, 'Tên bắt buộc phải nhập'],
    unique: true 
    },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v: string) {
        return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value: string) {
        const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        return phoneRegex.test(value);
      },
      message: `{VALUE} is not a valid phone!`,
      // message: (props) => `{props.value} is not a valid email!`,
    },
  },
  address: { type: String, required: true },
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
},
//Các options
{
  timestamps: true, //true tự tạo ra createAt và updateAt
}
);


supplierSchema.statics.isEmailTaken = async function(email, excludeId) {
  const item = await this.findOne({
    email,
    _id: {
      $ne: excludeId,
    },
  });
  return !!item;
};

supplierSchema.pre("save", async function (next) {
  if(this.slug == ""){
      this.slug = buildSlug(this.name);
  }
  next();
});

//3. Tạo Model User
const Supplier = model<ISupplier>('Supplier', supplierSchema);
export default Supplier;