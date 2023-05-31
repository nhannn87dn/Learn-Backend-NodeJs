const mongoose = require('mongoose');
const { Schema } = mongoose;

//Tạo Schema
const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    isEmailVerified: Boolean,
  },
  { timestamps: true }
);
// Tạo Model User
const User = new mongoose.model('User', userSchema);
module.exports = User;
