import { Schema, model } from 'mongoose';
import { IStaff, EnumRole, EnumBoolean,StaffModel, IStaffMethods } from '../types/models';
import bcrypt from 'bcrypt'
const SALT_WORK_FACTOR = 10;

const staffSchema = new Schema<IStaff,StaffModel, IStaffMethods>(
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
        unique: false,
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

//Đăng ký một trường ảo
staffSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

//Đăng ký một phương thức để so sánh mật khẩu
staffSchema.method('comparePassword', function comparePassword(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
});


//Đăng ký middleware
staffSchema.pre('save', function (next) {
  var staff = this;

  // only hash the password if it has been modified (or is new)
  if (!staff.isModified('password')) return next();

  /**
   * Mã hóa mật khẩu mỗi ghi save, update
   */
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(staff.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      staff.password = hash;
      next();
    });
  });
});

const Staff = model<IStaff, StaffModel>('Staff', staffSchema);
export default Staff;