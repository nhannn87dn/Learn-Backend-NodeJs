import { Schema, model, connect } from 'mongoose';

// 1. Tạo type
interface IUser {
  name: string;
  email: string;
  password: string;
  role?: string;
  isEmailVerified?: boolean;
}
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
//3. Tạo Model User
const User =  model<IUser>('User', userSchema);

export default User;