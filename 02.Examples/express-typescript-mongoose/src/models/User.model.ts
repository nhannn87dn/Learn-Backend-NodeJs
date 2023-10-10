import { Schema, model } from 'mongoose';
import { IUser } from '../types/models';
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;
// 1. Tạo type
//2.Tạo Schema
const userSchema = new Schema<IUser>(
  {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
    },
    isEmailVerified: {
        type: Boolean
    }
  }
);

userSchema.pre('save', function (next) {
    var user = this;
  
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
  
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err);
      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  });

userSchema.methods.comparePassword = function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

  
//3. Tạo Model User
const User =  model<IUser>('User', userSchema);

export default User;