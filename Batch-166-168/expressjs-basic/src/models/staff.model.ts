import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import { IStaff, IStaffMethods, StaffModel } from "../types/model";

const SALT_WORK_FACTOR = 10;

const staffSchema = new Schema<IStaff,StaffModel, IStaffMethods>({
    first_name: {
    type: String,
    maxLength: [50, "Tối đa 50 kí tự"],
    required: [true, "Yêu cầu điền"],
  },
  last_name: {
    type: String,
    maxLength: [50, "Tối đa 50 kí tự"],
    required: [true, "Yêu cầu điền"],
  },
  phone: {
    type: String,
    required: true, //default
    unique: true,
    validate: {
        validator: function (v: string) {
          return /0\d{9}$/.test(v);
        },
        message: (props: {value: string}) => `${props.value} is not a valid phone number!`,
      },
  },
  email: {
    type: String,
    maxLength: 150, //danh
    required: true,
    unique: true,
    lowercase: true,
    validate: {
        validator: function (v: string) {
            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
        },
        message: (props: {value: string}) => `${props.value} is not a valid email !`,
    },
  },
  active: {
    type: Boolean,
    default: true, //default
  },
  password: {
    type: String,
    required: true, //default
    minlength: 8,
    validate: {
        validator: function (v: string) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!*%$#]).{8,}$/.test(v);
        },
        message: (props: {value: string}) => `${props.value} is not a valid password!`,
    },
  }
}, {
  timestamps: true, //Tu tao them createdAt và updatedAt
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

const Staff = model<IStaff, StaffModel>("Staff", staffSchema);
export default Staff;
