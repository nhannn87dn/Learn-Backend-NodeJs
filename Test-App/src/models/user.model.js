const mongoose = require('mongoose');
const { Schema } = mongoose;

//Tạo Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    permissions: {
      type: [{
        module: String,
        action: String
      }],
      default: []
    },
    isEmailVerified: {
      type: Boolean,
      enum: [true, false],
      default: false
    }
  },
  { timestamps: true }
);
// Tạo Model User
const User = new mongoose.model('User', userSchema);
module.exports = User;
