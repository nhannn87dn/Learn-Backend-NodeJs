import { Schema, model } from 'mongoose';
import { IStaff, EnumRole, EnumBoolean } from '../types/models';

const staffSchema = new Schema<IStaff>(
    {
      firstName: {
        type: String,
        required: true,
        trim: true,
        min: [6, 'Too few eggs'],
        max: [12, 'Only allow Max 12 characters'],
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
        min: [6, 'Too few eggs'],
        max: [12, 'Only allow Max 12 characters'],
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
          validator: function (v: string) {
            return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(v);
          },
          message: (props) => `${props.value} is not a valid email!`,
        },
      },
      phone: {
        type: String,
        required: false,
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
          validator: function (value: string) {
            if(!value || value.length == 0) return true
            const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
            return phoneRegex.test(value);
          },
          message: `{VALUE} is not a valid phone!`,
          // message: (props) => `{props.value} is not a valid email!`,
        },
      },
      password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
        validate: {
          validator: function (v: string) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!*%$#]).{8,}$/.test(v);
          },
          message: (props) => `${props.value} is not a valid password!`,
        },
      },
      role: {
        type: String,
        enum: [EnumRole.Admin, EnumRole.SubAdmin, EnumRole.User],
        default: EnumRole.User,
      },
      isEmailVerified: {
        type: Boolean,
        enum: [EnumBoolean.Yes, EnumBoolean.No],
        default: true,
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
      timestamps: true,
      toJSON: { virtuals: true }, // <-- include virtuals in `JSON.stringify()`
      toObject: { virtuals: true },
    }
);


staffSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

const Staff = model<IStaff>('Staff', staffSchema);
export default Staff;